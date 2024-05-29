// import express from 'express';
const express = require('express');
// import cors from 'cors';
const cors = require('cors');

const app = express();
app.use(cors());

app.use('/public', express.static('public'));

//Mock data for the api
const products = [
    {
        product_id: 1,
        name: 'Nike Shoes',
        price: 125,
        description: 'Nike Air Max Running Shoes',
        image: 'http://localhost:3000/public/nike-shoes.jpg'
    },
    {
        product_id: 2,
        name: 'LG Refrigerator',
        price: 55,
        description: 'Refrigerator with ice maker and food storage compartment.',
        image: 'http://localhost:3000/public/lg-refrigerator.jpg'
    },
    {
        product_id: 3,
        name: 'Samsung TV',
        price: 100,
        description: '4k TV',
        image: 'http://localhost:3000/public/samsung-tv.jpg'
    },
    {
        product_id: 4,
        name: 'LG Washing Machine',
        price: 120,
        description: 'Washing Machine with Steam feature',
        image: 'http://localhost:3000/public/lg-washing-machine.jpg'
    },
    {
        product_id: 5,
        name: 'Nike Shoes',
        price: 125,
        description: 'Nike Air Max Running Shoes',
        image: 'http://localhost:3000/public/nike-shoes.jpg'
    },
    {
        product_id: 6,
        name: 'LG Refrigerator',
        price: 55,
        description: 'Refrigerator with ice maker and food storage compartment.',
        image: 'http://localhost:3000/public/lg-refrigerator.jpg'
    },
    {
        product_id: 7,
        name: 'Samsung TV',
        price: 100,
        description: '4k TV',
        image: 'http://localhost:3000/public/samsung-tv.jpg'
    },
    {
        product_id: 8,
        name: 'LG Washing Machine',
        price: 120,
        description: 'Washing Machine with Steam feature',
        image: 'http://localhost:3000/public/lg-washing-machine.jpg'
    },
    {
        product_id: 9,
        name: 'Nike Shoes',
        price: 125,
        description: 'Nike Air Max Running Shoes',
        image: 'http://localhost:3000/public/nike-shoes.jpg'
    },
    {
        product_id: 10,
        name: 'LG Refrigerator',
        price: 55,
        description: 'Refrigerator with ice maker and food storage compartment.',
        image: 'http://localhost:3000/public/lg-refrigerator.jpg'
    },
    {
        product_id: 11,
        name: 'Samsung TV',
        price: 100,
        description: '4k TV',
        image: 'http://localhost:3000/public/samsung-tv.jpg'
    },
    {
        product_id: 12,
        name: 'LG Washing Machine',
        price: 120,
        description: 'Washing Machine with Steam feature',
        image: 'http://localhost:3000/public/lg-washing-machine.jpg'
    },
]

app.get('/', (req, res) => {
    res.send('Server is running');
})

// Get all Products
app.get('/api/products', (req, res) => {
    console.log('GET /products');
    res.send({
        statusCode: 200,
        message: "Products retrieved successfully",
        data: products
    });
});

// Get a single product using its ID
app.get('/product/:id', (req, res) => {
    const id = req.params.id;
    let product = products.find(p => p.product_id == id);
    
    if (!product) {
        return res.status(404).send({
            statusCode: 404,
            message: `Product with the given ID was not found`
        })
    } else {
        res.send({
            statusCode: 200,
            message: "Product retrieved successfully",
            data: product
        })
    }
})

// Add a new product
app.post('/product/create', (req, res) => {
    console.log("POST /product");
    // Generate a unique id for this product by getting the length of the products array and adding one to it
    const newId = products.length > 0 ? Math.max(...products.map(p => p.product_id)) + 1 : 1;
    const newProduct = { ...req.body, product_id: newId };
    products.push(newProduct);

    res.send({
        statusCode: 201,
        message: 'Product created successfully',
        data: newProduct
    });
});
    
// Delete an existing product
app.delete('/product/delete/:id', (req, res) => {
    const id = req.params.id;
    const productIndex = products.findIndex(p => p.product_id === id);

    if (productIndex === -1) {
        return res.status(404).json({
            statusCode: 404,
            message: `The product with the provided ID does not exist.`
        });
    } else {
        const deletedProduct = products[productIndex];
        products.splice(productIndex, 1);
        
        res.json({
            statusCode: 200,
            message: "Product deleted successfully.",
            data: deletedProduct
        })
    }
});

const PORT = process.env.PORT || 3000;
const URL = `http://localhost:${PORT}`

app.listen(PORT, () => console.log(`Server started on port ${URL}`));