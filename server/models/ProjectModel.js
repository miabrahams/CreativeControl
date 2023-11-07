const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const projectSchema = new Schema({
  title:   { type: String },
  assets:  [{ type: mongoose.Schema.Types.ObjectID, ref:'Asset'}],
});


module.exports = mongoose.model('Client', clientSchema);