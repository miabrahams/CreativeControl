const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sessionSchema = new Schema({
  cookieId: { type: String, required: true, unique: true },
  createdAt: { type: Date, expires: 300, default: Date.now },
  OAuth: {
    token: { type: String, default: null },
    type: { type: String, default: null },
  },
});

module.exports = mongoose.model('Session', sessionSchema);
