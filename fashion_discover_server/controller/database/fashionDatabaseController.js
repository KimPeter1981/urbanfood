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

module.exports = router;