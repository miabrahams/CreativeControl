const express = require('express');

const router = express.Router();
const imageFileController = require('../controllers/imageFileController');
const assetController = require('../controllers/assetController');
const sessionController = require('../controllers/sessionController');


// const multer  = require('multer')
// const upload = multer({ dest: 'uploads/' })

router.post(
  '/:id/addImage',
  sessionController.validateLoginTest,
  imageFileController.upload.single('img'),
  imageFileController.loadImage,
  assetController.addImage,
  (req, res) => {
    return res.status(200).contentType('text/plain').end(res.locals.imageDoc._id);
  }
);


router.post(
  '/:userId/create',
  sessionController.validateLoginTest,
  imageFileController.upload.single('img'),
  imageFileController.loadImage,
  assetController.createAsset,
  assetController.addImage,
  async (req, res) => {
    return res.status(200).contentType('text/plain').end();
  }
);

// Get by ID
router.get('/:id', async (req, res, next) => {
  const {_id} = req.body;
  const assetDoc = await Asset.findById(_id);
  if (assetDoc) {
    res.status(200).json(assetDoc);
  }
  else {
    res.sendStatus(404);
  }
});

// EXPORT THE ROUTER
module.exports = router;