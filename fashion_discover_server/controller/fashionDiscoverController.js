const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const multer = require('multer');
const fashionDiscovery = require('../services/fashionDiscover');


const multerMid = multer({
    storage: multer.memoryStorage(),
    limits: {
      fileSize: 5 * 1024 * 1024,
    },
})

router.use(multerMid.single('file'))
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({extended: false}))

router.get('/file', (req, res) => {
    res.status(200).send({message: 'File upload'});
})

router.post('/discovery', multerMid.single('file'), async (req, res, next) => {
    try {
      let files = await fashionDiscovery.fashionDiscover(req.file);
      res.status(200).send(files);
    } catch(e) {
      next(e);
      res.status(500).send(e);
    }
 });

module.exports = router;