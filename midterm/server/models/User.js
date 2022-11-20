const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
  googleId: { type: String },
  username: { type: String, require: true },
  firstName: { type: String },
  lastName: { type: String },
  password: { type: String, require: true },
  createdAt: { type: Date, default: Date.now() },
});
const user = mongoose.model('User', userSchema);
module.exports = user;
