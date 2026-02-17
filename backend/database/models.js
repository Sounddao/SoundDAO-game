// models.js

const mongoose = require('mongoose');

// Player schema
const playerSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    balance: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
});

// Creator schema
const creatorSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    bio: String,
    createdAt: { type: Date, default: Date.now }
});

// Challenge schema
const challengeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'Creator' },
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }],
    createdAt: { type: Date, default: Date.now }
});

// Transaction schema
const transactionSchema = new mongoose.Schema({
    player: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' },
    amount: { type: Number, required: true },
    type: { type: String, enum: ['deposit', 'withdrawal'], required: true },
    createdAt: { type: Date, default: Date.now }
});

// Models
const Player = mongoose.model('Player', playerSchema);
const Creator = mongoose.model('Creator', creatorSchema);
const Challenge = mongoose.model('Challenge', challengeSchema);
const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = { Player, Creator, Challenge, Transaction };