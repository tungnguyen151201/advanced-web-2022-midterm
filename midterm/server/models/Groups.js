const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const GroupSchema = new Schema({
  groupname: { type: String, require: true },
  url: { type: String, require: true },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  owner: { type: Schema.Types.ObjectId, ref: 'User'},
  co_owner: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now() },
});
const Groups = mongoose.model('Group', GroupSchema);
module.exports = Groups;
