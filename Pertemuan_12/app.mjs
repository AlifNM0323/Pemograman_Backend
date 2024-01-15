// import express from 'express';
// import routes from "./routes/api.js";
// import dotenv from 'dotenv';

// const app = express();


// app.use(express.json());
// app.use(express.urlencoded());

// dotenv.config();

// app.use(routes)

// // const port = process.env.APP_PORT
// const port = 3000
// app.listen(3000,()=>{
//     console.log("Server Berjalan di http://localhost:"+port)
// })


// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');

// const app = express();
// const PORT = 3000;

// mongoose.connect('mongodb://localhost:27017/nama-database', { useNewUrlParser: true, useUnifiedTopology: true });

// const Item = mongoose.model('Item', {
//   name: String,
//   price: Number,
// });

// app.use(bodyParser.json());

// const authenticateUser = (req, res, next) => {
  
//   const token = req.headers.authorization;
//   if (!token) {
//     return res.status(401).json({ message: 'Authentication failed' });
//   }
  
//   next();
// };


// const validateItem = (req, res, next) => {
  
//   const { name, price } = req.body;
//   if (!name || !price) {
//     return res.status(400).json({ message: 'Name and price are required' });
//   }
//   next();
// };


// app.post('/items', authenticateUser, validateItem, async (req, res) => {
//   try {
//     const newItem = new Item(req.body);
//     await newItem.save();
//     res.status(201).json(newItem);
//   } catch (error) {
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

// app.get('/items', async (req, res) => {
//   try {
   
//     const filter = {}; 
//     const sort = { createdAt: 1 }; 

//     const items = await Item.find(filter).sort(sort);
//     res.status(200).json(items);
//   } catch (error) {
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });


import  express  from "express"
import dotenv from 'dotenv';
import routes from "./routes/api.js"
import logger from "./middleware/logger.js"

const app = express();

app.use(express.json())
app.use(express.urlencoded())

dotenv.config();

app.use(logger)
app.use(routes)

const port = process.env.APP_PORT || 3000
app.listen(port,()=>{
    console.log("Server Berjalan di http://localhost:"+port)
})

