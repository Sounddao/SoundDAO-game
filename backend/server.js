const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Sample API endpoint
app.get('/api/games', (req, res) => {
    // Logic to retrieve games would go here
    res.json({ message: 'List of games' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
