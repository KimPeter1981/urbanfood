const productRepository = require('../../services/database/productRepository');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.json());

router.post('/products', (req, res) => {
    let productFilter = req.body.keys;
    let products = productRepository.checkAggregates(productFilter);
    res.status(200).send(products);
})

module.exports = router;