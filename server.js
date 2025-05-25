const express = require('express');
const cors = require('cors');
const app = express();

// Enable CORS for all origins
app.use(cors());
app.use(express.json());

// Product database
const products = [
    {
        id: 1,
        name: 'Samsung A23',
        category: 'تليفونات',
        brand: 'سامسونج',
        price: 4999,
        image: 'https://m.media-amazon.com/images/I/61VfL-aiToL._AC_SX679_.jpg'
    },
    {
        id: 2,
        name: 'Xiaomi Note 12',
        category: 'تليفونات',
        brand: 'شاومي',
        price: 5999,
        image: 'https://m.media-amazon.com/images/I/51qL0z0+31L._AC_SX679_.jpg'
    },
    {
        id: 3,
        name: 'LG WashPro',
        category: 'غسالات',
        brand: 'ال جي',
        price: 8999,
        image: 'https://m.media-amazon.com/images/I/61E+b5+idyL._AC_SX679_.jpg'
    },
    {
        id: 4,
        name: 'Samsung WashX',
        category: 'غسالات',
        brand: 'سامسونج',
        price: 9999,
        image: 'https://m.media-amazon.com/images/I/61vd1+58SSL._AC_SX679_.jpg'
    }
];

// Store the current filter
let currentFilter = {
    category: '',
    brand: ''
};

// Store orders
let orders = [];
let nextOrderId = 1;

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

// Get filtered products
app.get('/api/products', (req, res) => {
    let filteredProducts = [...products];
    
    if (currentFilter.category) {
        filteredProducts = filteredProducts.filter(p => p.category === currentFilter.category);
    }
    
    if (currentFilter.brand) {
        filteredProducts = filteredProducts.filter(p => p.brand === currentFilter.brand);
    }
    
    res.json({ products: filteredProducts });
});

// Get product by ID
app.get('/api/products/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
});

// Create new order
app.post('/api/orders', (req, res) => {
    const { customerName, phone, address, products } = req.body;
    
    if (!customerName || !phone || !address || !products || !products.length) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    
    const order = {
        id: nextOrderId++,
        customerName,
        phone,
        address,
        products,
        status: 'pending',
        createdAt: new Date().toISOString()
    };
    
    orders.push(order);
    res.json({ success: true, orderId: order.id });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 