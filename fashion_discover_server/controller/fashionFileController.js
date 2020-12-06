const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const multer = require('multer')
const fashionFileService = require('../services/uploadService');

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

router.post('/upload', multerMid.single('file'), async (req, res, next) => {
   try {
     let result = await fashionFileService.uploadImage(req.file, 'upload/');
     res.status(200).send(result);
   } catch(e) {
     next(e);
     res.status(500).send(e);
   }
});

module.exports = router;
