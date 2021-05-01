const database = require('../../services/database/firestoreCrud');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.json())

router.get('/all', async (req, res) => {
    let result = await database.getAll();
    res.status(200).send(result);
})

router.get('/fashion', async (req, res) => {
    const uuid = req.query.id;

    if (!uuid) {
        res.status(400).send({message: 'UUID must be specified!'});
    }

    const result = await database.getDocument(uuid);
    res.status(200).send(result);
})

router.get('/fashionSetPreview', async (req, res) => {
    const uuid = req.query.id;

    if (!uuid) {
        res.status(400).send({message: 'UUID must be specified!'});
    }

    const result = await database.fashionSetPreview(uuid);
    res.status(200).send(result);
})

router.get('/fashionPiece', async (req, res) => {
    const uuid = req.query.id;
    const piece = req.query.piece;

    if (!uuid) {
        res.status(400).send({message: 'UUID must be specified!'});
    }

    if (!piece) {
        res.status(400).send({message: 'piece must be specified!'});
    }

    const result = await database.getFashionPiece(uuid, piece);
    res.status(200).send(result);
})

router.get('/piece', async (req, res) => {
    const startId = req.query.startId;

    if (!startId) {
        res.status(400).send({message: 'startId must be specified'})
    }

    const result = await database.getPieces(startId);
    res.status(200).send(result);
})

router.get('/fashionpiece', async (req, res) => {
    const uuid = req.query.id;
    const piece = req.query.piece;

    if (!uuid) {
        res.status(400).send({message: 'UUID must be specified!'});
    }

    if (!piece) {
        res.status(400).send({message: 'Piece must be specified!'});
    }

    const result = await database.fashionMetaData(uuid, piece);
    res.status(200).send(result);
})

router.put('/description', async (req, res) => {
    const obj = req.body;
    if (!obj.uuid) {
        res.status(400).send({message: 'UUID must be specified!'});
    }

    if (!obj.piece) {
        res.status(400).send({message: 'Piece must be specified!'});
    }

    if (!obj.description) {
        res.status(400).send({message: 'Description must be specified!'});
    }
    
    const result = await database.addDescription(obj);

    res.status(200).send(obj);
})

module.exports = router;