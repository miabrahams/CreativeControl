const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const fs = require('fs');

const imageFileSchema = new Schema({
  filename:  String,
});


// Handle file removal
imageFileSchema.post('remove', function () {
  console.log('deleting one: ', doc)
  fs.unlink(this.filename, (err) => {
    if (err) return console.log('****ERROR: Could not unlink file!');
  });
});



module.exports = mongoose.model('ImageFile', imageFileSchema);