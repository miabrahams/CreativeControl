
const imageFileController = require('../controllers/imageFileController');
const router = require('express').Router();


/*
router.post(
  '/upload',
  imageFileController.upload.single('file'),
  imageFileController.loadImage,

  (req, res) => {
    return res.status(200).json(res.locals.imageDoc);
  }
);
*/

// Image by id?
router.get('/:id', (req, res, next) => res.status(501).send('Not ready yet!'));

// EXPORT THE ROUTER
module.exports = router;
