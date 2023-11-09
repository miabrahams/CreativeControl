const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const fs = require('fs');

const imageFileSchema = new Schema({
  filename:  String,
});


// Handle file removal
imageFileSchema.post('remove', function () {
  console.log('File removal: ', this.filename);

  if (!this.filename.includes('static')) {
    console.log('deleting image', doc)
    fs.unlink(this.filename, (err) => {
      if (err) return console.log('****ERROR: Could not unlink file!');
    });
  }
});

// removeMany?


module.exports = mongoose.model('ImageFile', imageFileSchema);