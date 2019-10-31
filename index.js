require('dotenv').config();
const express = require('express');

// const db = require('./data/db');

const dbRouter = require('./data/seeds/db-router');

const server = express();

server.use(express.json());

server.get('/', (req, res) =>{
    res.status(200).json({message: process.env.MSG})

});

server.use('/api/posts', dbRouter);



const port = process.env.PORT ;

server.listen(port, () => { console.log(`n\$$$$$$$$$$$$$$$ Server Running on port ${port} $$$$$$$$$$$$$$$\n`) });