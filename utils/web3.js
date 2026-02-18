import { ethers } from 'ethers';

// Contract ABIs
export const SOUNDCOIN_ABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function transfer(address to, uint256 amount) returns (bool)",
  "function approve(address spender, uint256 amount) returns (bool)",
  "function allowance(address owner, address spender) view returns (uint256)",
  "event Transfer(address indexed from, address indexed to, uint256 value)"
];

export const GAME_MECHANICS_ABI = [
  "function completeChallenge(uint256 challengeId) returns (bool)",
  "function getChallengeReward(uint256 challengeId) view returns (uint256)",
  "function playerStats(address player) view returns (uint256 score, uint256 level, uint256 lastActivity)",
  "event ChallengeCompleted(address indexed player, uint256 challengeId, uint256 reward)"
];

export const CREATOR_SUPPORT_ABI = [
  "function registerCreator(uint256 royaltyRate) returns (bool)",
  "function createFundingRound(uint256 goal, uint256 duration) returns (uint256)",
  "function contribute(uint256 roundId) payable returns (bool)",
  "function isCreator(address account) view returns (bool)",
  "event CreatorRegistered(address indexed creator, uint256 royaltyRate)",
  "event FundingRoundCreated(uint256 indexed roundId, address creator, uint256 goal)"
];

export const MARKETPLACE_ABI = [
  "function listNFT(uint256 tokenId, uint256 price) returns (bool)",
  "function buyNFT(uint256 listingId) payable returns (bool)",
  "function cancelListing(uint256 listingId) returns (bool)",
  "function getListings() view returns (tuple(uint256 listingId, uint256 tokenId, address seller, uint256 price)[])",
  "event NFTListed(uint256 indexed listingId, address seller, uint256 tokenId, uint256 price)",
  "event NFTSold(uint256 indexed listingId, address buyer, uint256 price)"
];

// Contract addresses (update these after deployment)
export const CONTRACT_ADDRESSES = {
  SOUNDCOIN: "0x0000000000000000000000000000000000000000",
  GAME_MECHANICS: "0x0000000000000000000000000000000000000000",
  CREATOR_SUPPORT: "0x0000000000000000000000000000000000000000",
  MARKETPLACE: "0x0000000000000000000000000000000000000000"
};

// Initialize Web3 Provider
export const getProvider = () => {
  if (window.ethereum) {
    return new ethers.providers.Web3Provider(window.ethereum);
  }
  throw new Error('MetaMask not installed');
};

// Get signer
export const getSigner = async () => {
  const provider = getProvider();
  return provider.getSigner();
};

// Connect wallet
export const connectWallet = async () => {
  try {
    const provider = getProvider();
    const accounts = await provider.send("eth_requestAccounts", []);
    return accounts[0];
  } catch (error) {
    console.error('Error connecting wallet:', error);
    throw error;
  }
};

// Get contract instance
export const getContract = async (contractName) => {
  const signer = await getSigner();
  const address = CONTRACT_ADDRESSES[contractName];
  let abi;
  
  switch(contractName) {
    case 'SOUNDCOIN':
      abi = SOUNDCOIN_ABI;
      break;
    case 'GAME_MECHANICS':
      abi = GAME_MECHANICS_ABI;
      break;
    case 'CREATOR_SUPPORT':
      abi = CREATOR_SUPPORT_ABI;
      break;
    case 'MARKETPLACE':
      abi = MARKETPLACE_ABI;
      break;
    default:
      throw new Error('Unknown contract');
  }
  
  return new ethers.Contract(address, abi, signer);
};

// Format token amount
export const formatTokenAmount = (amount, decimals = 18) => {
  return ethers.utils.formatUnits(amount, decimals);
};

// Parse token amount
export const parseTokenAmount = (amount, decimals = 18) => {
  return ethers.utils.parseUnits(amount.toString(), decimals);
};

// Shorten address
export const shortenAddress = (address) => {
  if (!address) return '';
  return `${address.substring(0, 6)}...${address.substring(38)}`;
};