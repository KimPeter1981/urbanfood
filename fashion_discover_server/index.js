const express = require('express');
const bodyParser = require('body-parser');
const fashionFileController = require('./controller/fashionFileController');
const fashionDiscoverController = require('./controller/fashionDiscoverController');
const fashionDatabaseController = require('./controller/database/fashionDatabaseController');
const cors = require('cors');

const PORT = process.env.PORT || 3000;

const server = express();

server.use(cors());
server.use(bodyParser.json());
server.use('/fashion', fashionFileController);
server.use('/fashion', fashionDiscoverController);
server.use('/database', fashionDatabaseController);

server.get('/health', (req, res) => {
    res.status(200).send({healt: 'Server is up and running!'})
})

server.listen(PORT, () => console.log('Server is up and running!'));