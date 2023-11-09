const ImageFileController = {};


const ImageFile = require('../models/ImageFileModel');
const multer = require('multer');
const { file_save_path, file_serve_path } = require('../config');

// Set up storage for uploaded files
// you might also want to set some limits: https://github.com/expressjs/multer#limits
const storage = multer.diskStorage({
  destination: (req, file, next) => {
    next(null, file_save_path);
  },
  filename: (req, file, next) => {
    next(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({storage});
ImageFileController.upload = upload;
ImageFileController.uploadSingle = upload.single('file');

/**
 * After multer:
 *  req.file is `file`
 *  req.body will hold the text fields, if there were any
 */

ImageFileController.loadImage = async (req, res, next) => {
  console.log('multer body: ', req.body);
  console.log("FILE:", req.file);
  // console.log()
  res.locals.imageDoc = await ImageFile.create({filename: file_serve_path + '/' + req.file.filename});
  console.log('imageDoc: ', res.locals.imageDoc);
  next();
}

ImageFileController.deleteImage = async(req, res, next) => {
  console.log('Deleting image');
  fs.unlink(res.locals.path, (err) => {
    if (err) return next(err);
    res.status(403).contentType('text/plain').end('Unable to delete image!');
  });

}

module.exports = ImageFileController;