const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const assetSchema = new Schema({
  title:      { type: String },
  notes:      { type: String },
  createdAt:  { type: Date, default: Date.now },
  updatedAt:  { type: Date, default: Date.now },
  imageFiles: [{ type: mongoose.Schema.Types.ObjectID, ref:'ImageFile'}],
  extraImageURLs: [{type: String}],
});


module.exports = mongoose.model('Asset', assetSchema);