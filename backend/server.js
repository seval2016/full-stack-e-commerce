const express = require('express');
const mongoose = require('mongoose');
const app = express(); 
const port = 5000;
const connect= async () => {
    try {
        await mongoose.connect('mongodb+srv://e-commerce:mern12345@mern-e-commerce.qgqnhh8.mongodb.net/');
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

app.get('/', (req, res) => {
  res.send('Hello Express.js!');
});

app.listen(port, () => {
    connect();
    console.log(`Server is running at http://localhost:${port}`);
    }   
);