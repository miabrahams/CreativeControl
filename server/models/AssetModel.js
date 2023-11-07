const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const assetSchema = new Schema({
  title:      { type: String, required: true },
  notes:      String,
  imageFiles: [{ type: mongoose.Schema.Types.ObjectID, ref:'ImageFile'}],
});


module.exports = mongoose.model('Asset', assetSchema);