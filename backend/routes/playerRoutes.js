const express = require('express');
const router = express.Router();

// Dummy database of players
let players = [];

// Create a new player
router.post('/players', (req, res) => {
    const { name, level } = req.body;
    const newPlayer = { id: players.length + 1, name, level };
    players.push(newPlayer);
    res.status(201).json(newPlayer);
});

// Get all players
router.get('/players', (req, res) => {
    res.json(players);
});

// Get a player by ID
router.get('/players/:id', (req, res) => {
    const player = players.find(p => p.id === parseInt(req.params.id));
    if (!player) return res.status(404).send('Player not found');
    res.json(player);
});

// Update a player's level
router.put('/players/:id', (req, res) => {
    const player = players.find(p => p.id === parseInt(req.params.id));
    if (!player) return res.status(404).send('Player not found');
    player.level = req.body.level;
    res.json(player);
});

// Delete a player
router.delete('/players/:id', (req, res) => {
    const playerIndex = players.findIndex(p => p.id === parseInt(req.params.id));
    if (playerIndex === -1) return res.status(404).send('Player not found');
    const deletedPlayer = players.splice(playerIndex, 1);
    res.json(deletedPlayer);
});

module.exports = router;