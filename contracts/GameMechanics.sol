// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract GameMechanics {
    struct Player {
        uint256 level;
        uint256 experience;
        uint256 challengesCompleted;
        uint256 rewards;
    }
    
    mapping(address => Player) public players;
    
    event LevelUp(address indexed player, uint256 newLevel);
    event ChallengeCompleted(address indexed player, uint256 challengeId);
    event RewardIssued(address indexed player, uint256 rewardAmount);
    
    function initializePlayer() public {
        require(players[msg.sender].level == 0, "Player already initialized.");
        players[msg.sender] = Player(1, 0, 0, 0);
    }
    
    function completeChallenge(uint256 challengeId) public {
        require(players[msg.sender].level > 0, "Player not initialized.");
        players[msg.sender].experience += 100; // Example experience gain
        players[msg.sender].challengesCompleted++;
        emit ChallengeCompleted(msg.sender, challengeId);
        checkLevelUp(msg.sender);
    }
    
    function checkLevelUp(address player) internal {
        if (players[player].experience >= players[player].level * 100) { // Example level up condition
            players[player].level++;
            players[player].experience = 0; // Reset experience after leveling up
            emit LevelUp(player, players[player].level);
        }
    }
    
    function issueReward(uint256 amount) public {
        require(players[msg.sender].level > 0, "Player not initialized.");
        players[msg.sender].rewards += amount;
        emit RewardIssued(msg.sender, amount);
    }
}