const express = require('express');
const multer = require('multer');
const path = require('path');

// const ImageFileController = require('../controllers/ImageFileController');
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
  function (req, res, next) {
    // req.file is `file`
    // req.body will hold the text fields, if there were any
    const tempPath = req.file.path;
    const targetPath = path.join(__dirname, './uploads/image.png');

    console.log('Got a file!');
    console.log('tempPath', tempPath);

    return res.status(200).contentType('text/plain').end('File uploaded!');




    // if (path.extname(req.file.originalname).toLowerCase() === '.png') {
    //   fs.rename(tempPath, targetPath, (err) => {
    //     if (err) return handleError(err, res);

    //     return res.status(200).contentType('text/plain').end('File uploaded!');
    //   });
    // } else {
    //   fs.unlink(tempPath, (err) => {
    //     if (err) return handleError(err, res);

    //     res
    //       .status(403)
    //       .contentType('text/plain')
    //       .end('Only .png files are allowed!');
    //   });
    // }
  }
);

// Image by id?
router.get('/:id', (req, res, next) => res.status(501).send('Not ready yet!'));

// EXPORT THE ROUTER
module.exports = router;
