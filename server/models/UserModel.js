const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SALT_WORK_FACTOR = 5;
const bcrypt = require('bcryptjs');


const userSchema = new Schema({
  username: { type: String, required: true, unique: true, index:true },
  password: { type: String, required: true },
  displayName: String,
  profilePic: String,
  projects: [ { type: mongoose.Schema.Types.ObjectID, ref:'Project'} ],
})

// Hash password before storing in database.
userSchema.pre('save', function (next) {
  const query = this;
  bcrypt.hash(this.password, SALT_WORK_FACTOR, function (err, hash) {
    if (err) return next(err);
    query.password = hash;
    return next();
  });
});

module.exports = mongoose.model('User', userSchema);

