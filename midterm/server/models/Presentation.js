const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PresentationSchema = new Schema({
  name: { type: String, require: true },
  owner: { type: mongoose.ObjectId, require: true, ref: 'User' },
  slides: [
    {
      question: { type: String, require: true },
      options: [{ type: String, require: true }],
      createdAt: { type: Date, default: Date.now() },
    },
  ],
  createdAt: { type: Date, default: Date.now() },
});
const Presentation = mongoose.model('Presentation', PresentationSchema);
module.exports = Presentation;
