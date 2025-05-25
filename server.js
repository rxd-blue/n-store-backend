const express = require('express');
const cors = require('cors');
const app = express();

// Enable CORS for all origins
app.use(cors());
app.use(express.json());

// Store the current filter
let currentFilter = {
    category: '',
    brand: ''
};

// Root endpoint
app.get('/', (req, res) => {
    res.json({ message: 'N-Store API is running' });
});

// Get current filter
app.get('/api/filter', (req, res) => {
    res.json(currentFilter);
});

// Update filter
app.post('/api/filter', (req, res) => {
    const { category, brand } = req.body;
    currentFilter = {
        category: category || '',
        brand: brand || ''
    };
    console.log('New filter applied:', currentFilter);
    res.json({ success: true, filter: currentFilter });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 