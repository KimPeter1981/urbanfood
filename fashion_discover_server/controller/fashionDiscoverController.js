const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const multer = require('multer');
const fashionDiscovery = require('../services/fashionDiscover');
const visionService = require('../services/visionService');
const { request } = require('express');

const multerMid = multer({
    storage: multer.memoryStorage(),
    limits: {
      fileSize: 5 * 1024 * 1024,
    },
})

router.use(multerMid.single('file'))
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({extended: false}))

router.post('/discovery', multerMid.single('file'), async (req, res, next) => {
    try {
      let files = await fashionDiscovery.fashionDiscover(req.file);
      res.status(200).send(files);
    } catch(e) {
      next(e);
      res.status(500).send(e);
    }
 });

 router.get('/details', async (req, res) => {
   const id = req.query.id;
   const part = req.query.part;

   if (!id) {
     res.status(400).send({message: 'id must be specified!'});
   }

   if (!part) {
    res.status(400).send({message: 'part must be specified!'});
  }

  const result = await visionService.getObjectDetails(id, part);
  res.status(200).send(result);
 
 })

module.exports = router;