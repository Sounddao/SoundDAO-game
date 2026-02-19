# SoundDAO Game - Testing Guide

## 🎮 Testing Playgrounds

### 1. **Local Development (Recommended for Testing)**

#### Prerequisites
- Node.js 16+ and npm
- MetaMask browser extension
- Git

#### Setup Steps

```bash
# Clone the repository
git clone https://github.com/Sounddao/SoundDAO-game.git
cd SoundDAO-game

# Install backend dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
cd ..

# Start local blockchain (Hardhat)
npx hardhat node

# Deploy contracts (in a new terminal)
npx hardhat run scripts/deploy.js --network localhost

# Start backend server (in a new terminal)
npm start

# Start frontend (in a new terminal)
cd frontend
npm start
```

#### Configure MetaMask for Local Testing
1. Add Hardhat Network:
   - Network Name: Hardhat Local
   - RPC URL: http://127.0.0.1:8545
   - Chain ID: 31337
   - Currency Symbol: ETH

2. Import test accounts (use private keys from Hardhat node output)

---

### 2. **Testnet Deployment (Sepolia)**

#### Deploy to Sepolia
```bash
# Configure environment variables
cp .env.example .env
# Add your SEPOLIA_RPC_URL and PRIVATE_KEY to .env

# Deploy to Sepolia
npx hardhat run scripts/deploy.js --network sepolia
```

#### Get Test ETH
- **Sepolia Faucet**: https://sepoliafaucet.com/
- **Alchemy Faucet**: https://www.alchemy.com/faucets/ethereum-sepolia

---

### 3. **Online IDEs (Quick Testing)**

#### Remix IDE (Smart Contracts)
1. Visit https://remix.ethereum.org/
2. Copy contract code from `contracts/` folder
3. Compile and deploy to JavaScript VM
4. Test contract functions directly

#### CodeSandbox (Frontend)
1. Visit https://codesandbox.io/
2. Import GitHub repo
3. Configure environment
4. Test UI components

---

## 🧪 Testing Scenarios

### Game Mechanics Testing

**Test Challenge Completion:**
```javascript
// In browser console or test file
const gameContract = await getContract('GAME_MECHANICS');
const tx = await gameContract.completeChallenge(1);
await tx.wait();
console.log('Challenge completed!');
```

**Check Player Stats:**
```javascript
const stats = await gameContract.playerStats(userAddress);
console.log('Score:', stats.score.toString());
console.log('Level:', stats.level.toString());
```

### NFT Marketplace Testing

**List an NFT:**
```javascript
const marketplace = await getContract('MARKETPLACE');
const tx = await marketplace.listNFT(tokenId, parseTokenAmount('100'));
await tx.wait();
```

**Buy an NFT:**
```javascript
const tx = await marketplace.buyNFT(listingId, { value: parseTokenAmount('100') });
await tx.wait();
```

### Creator Support Testing

**Register as Creator:**
```javascript
const creatorSupport = await getContract('CREATOR_SUPPORT');
const tx = await creatorSupport.registerCreator(10); // 10% royalty
await tx.wait();
```

**Create Funding Round:**
```javascript
const goal = parseTokenAmount('1000'); // 1000 SND tokens
const duration = 30 * 24 * 60 * 60; // 30 days in seconds
const tx = await creatorSupport.createFundingRound(goal, duration);
await tx.wait();
```

---

## 🔍 Unit Testing

### Run All Tests
```bash
# Backend tests
npm test

# Frontend tests
cd frontend
npm test

# Coverage report
npm test -- --coverage
```

### Test Files Structure
```
test/
├── SoundCoin.test.js
├── GameMechanics.test.js
├── CreatorSupport.test.js
└── SoundMarketplace.test.js

frontend/src/
└── __tests__/
    ├── App.test.js
    ├── GameUI.test.js
    └── NFTMarketplace.test.js
```

---

## 🎯 Best Testing Practices

### 1. **Test User Flows**
- [ ] Connect wallet
- [ ] Complete a challenge
- [ ] Earn tokens
- [ ] List NFT for sale
- [ ] Purchase NFT
- [ ] Register as creator
- [ ] Create funding round

### 2. **Edge Cases**
- [ ] Insufficient balance
- [ ] Invalid inputs
- [ ] Network errors
- [ ] Transaction failures

### 3. **Performance Testing**
- [ ] Load time < 3 seconds
- [ ] Transaction confirmation < 30 seconds (testnet)
- [ ] Smooth UI interactions

---

## 🚀 Deployment Testing Checklist

- [ ] All contracts deployed successfully
- [ ] Contract addresses updated in `utils/web3.js`
- [ ] Frontend connects to correct network
- [ ] All features functional on testnet
- [ ] Gas optimization verified
- [ ] Security audit completed
- [ ] Documentation updated

---

## 📊 Testing Tools

### Recommended Tools
1. **Hardhat**: Local blockchain and testing
2. **Waffle**: Smart contract testing framework
3. **React Testing Library**: Frontend component testing
4. **Jest**: JavaScript testing framework
5. **MetaMask**: Wallet integration testing
6. **Tenderly**: Transaction debugging

### Browser Extensions
- MetaMask
- React Developer Tools
- Redux DevTools (if using Redux)

---

## 🐛 Troubleshooting

### Common Issues

**MetaMask not connecting:**
- Check network configuration
- Clear browser cache
- Reset MetaMask account

**Transaction failing:**
- Check gas limits
- Verify contract addresses
- Ensure sufficient balance

**Frontend not loading:**
- Check console for errors
- Verify backend is running
- Check CORS configuration

---

## 📞 Support

For testing issues:
1. Check documentation
2. Review error logs
3. Open GitHub issue
4. Contact team on Discord

---

## 🎉 Happy Testing!

Remember: Thorough testing ensures a great user experience!