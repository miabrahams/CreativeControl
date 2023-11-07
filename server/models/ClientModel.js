const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const clientSchema = new Schema({
  name:    { type: String },
  project: { type: mongoose.Schema.Types.ObjectID, ref:'Project'},
});


module.exports = mongoose.model('Client', clientSchema);