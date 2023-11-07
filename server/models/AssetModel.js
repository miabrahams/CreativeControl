const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const assetSchema = new Schema({
  title:     { type: String, required: true },
  file:      String,
  notes:     String,
  project:   { type: mongoose.Schema.Types.ObjectID, ref:'Project'},
});


module.exports = mongoose.model('Asset', assetSchema);