const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const projectSchema = new Schema({
  title:    { type: String },
  status:   { type: {} },
  assets:  [{ type: mongoose.Schema.Types.ObjectID, ref:'Asset'}],
});


module.exports = mongoose.model('Project', projectSchema);