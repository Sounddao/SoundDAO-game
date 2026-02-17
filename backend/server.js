const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'SoundDAO Backend is running' });
});

app.get('/api/game/player/:address', (req, res) => {
    const { address } = req.params;
    res.json({ address, level: 1, experience: 0, challengesCompleted: 0, rewards: 0 });
});

app.post('/api/game/challenge', (req, res) => {
    const { playerAddress, challengeId } = req.body;
    res.json({ success: true, message: 'Challenge completed', playerAddress, challengeId, rewardAmount: 100 });
});

app.get('/api/creator/:address', (req, res) => {
    const { address } = req.params;
    res.json({ address, totalFunded: 0, royaltyRate: 10, active: true });
});

app.post('/api/creator/register', (req, res) => {
    const { address, royaltyRate } = req.body;
    res.json({ success: true, message: 'Creator registered', address, royaltyRate });
});

app.post('/api/funding/contribute', (req, res) => {
    const { roundId, contributor, amount } = req.body;
    res.json({ success: true, message: 'Contribution successful', roundId, contributor, amount });
});

app.get('/api/marketplace/listings', (req, res) => {
    res.json({ listings: [{ id: 1, name: 'Art Piece 1', price: 100, seller: '0x...' }, { id: 2, name: 'Music NFT 1', price: 250, seller: '0x...' }] });
});

app.post('/api/marketplace/list', (req, res) => {
    const { nftAddress, tokenId, price } = req.body;
    res.json({ success: true, message: 'NFT listed', nftAddress, tokenId, price });
});

app.post('/api/chatbot/message', (req, res) => {
    const { message, userId } = req.body;
    res.json({ userId, userMessage: message, botResponse: 'Hello! How can I help you with your SoundDAO journey?' });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`SoundDAO Backend running on port ${PORT}`);
});