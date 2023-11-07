const express = require('express');
const multer = require('multer');
const path = require('path');

const ImageFile = require('../models/ImageFileModel');
const router = express.Router();

// you might also want to set some limits: https://github.com/expressjs/multer#limits
const { file_save_path } = require('../config');

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, next) => {
    next(null, file_save_path);
  },
  filename: (req, file, next) => {
    next(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({storage});


router.post(
  '/upload',
  upload.single('file'),
  // 'file' is the name of the form field containing the image
  async (req, res, next) => {
    // req.file is `file`
    // req.body will hold the text fields, if there were any

    console.log('Got a file!');
    console.log('tempPath', tempPath);

    res.locals.imageDoc = await ImageFile.create({filename: req.file.path});


    return res.status(200).contentType('text/plain').end('File uploaded!');



    /*
    fs.unlink(tempPath, (err) => {
      if (err) return handleError(err, res);
      res.status(403).contentType('text/plain').end('Only .png files are allowed!');
      });
    */
  }
);

// Image by id?
router.get('/:id', (req, res, next) => res.status(501).send('Not ready yet!'));

// EXPORT THE ROUTER
module.exports = router;
