// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CreatorSupport is Ownable {
    IERC20 public soundToken;

    struct Creator {
        address creatorAddress;
        uint256 totalFunded;
        uint256 royaltyRate;
        bool active;
    }

    struct FundingRound {
        uint256 roundId;
        address creator;
        uint256 fundingGoal;
        uint256 amountRaised;
        uint256 deadline;
        bool completed;
    }

    mapping(address => Creator) public creators;
    mapping(uint256 => FundingRound) public fundingRounds;
    uint256 public roundCounter;

    event CreatorRegistered(address indexed creator, uint256 royaltyRate);
    event FundingRoundCreated(uint256 indexed roundId, address indexed creator, uint256 goal);
    event FundingContribution(uint256 indexed roundId, address indexed backer, uint256 amount);
    event FundingCompleted(uint256 indexed roundId, address indexed creator, uint256 totalRaised);

    constructor(address _soundToken) {
        soundToken = IERC20(_soundToken);
    }

    function registerCreator(uint256 royaltyRate) external {
        require(royaltyRate > 0 && royaltyRate <= 100, "Invalid royalty rate");
        creators[msg.sender] = Creator(msg.sender, 0, royaltyRate, true);
        emit CreatorRegistered(msg.sender, royaltyRate);
    }

    function createFundingRound(uint256 fundingGoal, uint256 durationDays) external {
        require(creators[msg.sender].active, "Creator not registered");
        require(fundingGoal > 0, "Funding goal must be positive");
        uint256 roundId = roundCounter++;
        fundingRounds[roundId] = FundingRound(
            roundId,
            msg.sender,
            fundingGoal,
            0,
            block.timestamp + (durationDays * 1 days),
            false
        );
        emit FundingRoundCreated(roundId, msg.sender, fundingGoal);
    }

    function contributeFunding(uint256 roundId, uint256 amount) external {
        FundingRound storage round = fundingRounds[roundId];
        require(!round.completed, "Funding round already completed");
        require(block.timestamp <= round.deadline, "Funding round expired");
        require(amount > 0, "Contribution must be positive");
        soundToken.transferFrom(msg.sender, address(this), amount);
        round.amountRaised += amount;
        if (round.amountRaised >= round.fundingGoal) {
            round.completed = true;
            emit FundingCompleted(roundId, round.creator, round.amountRaised);
        }
        emit FundingContribution(roundId, msg.sender, amount);
    }

    function withdrawFunds(uint256 roundId) external {
        FundingRound storage round = fundingRounds[roundId];
        require(round.completed, "Funding round not completed");
        require(msg.sender == round.creator, "Only creator can withdraw");
        uint256 amount = round.amountRaised;
        round.amountRaised = 0;
        soundToken.transfer(msg.sender, amount);
    }

    function getCreator(address creatorAddr) external view returns (Creator memory) {
        return creators[creatorAddr];
    }

    function getFundingRound(uint256 roundId) external view returns (FundingRound memory) {
        return fundingRounds[roundId];
    }
}