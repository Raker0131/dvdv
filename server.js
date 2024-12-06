const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// In-memory storage for comments
let comments = [];

// Routes
// Get all comments
app.get('/api/comments', (req, res) => {
    res.json(comments);
});

// Post a new comment
app.post('/api/comments', (req, res) => {
    const { text, timestamp } = req.body;

    if (!text || !timestamp) {
        return res.status(400).json({ error: 'Text and timestamp are required' });
    }

    const newComment = { id: comments.length + 1, text, timestamp };
    comments.push(newComment);

    res.status(201).json(newComment);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
