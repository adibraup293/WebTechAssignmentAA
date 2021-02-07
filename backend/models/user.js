const mongoose = require ('mongoose');

const postSchema = mongoose.Schema({
  name: {type: String, required:true},
  username: {type: String, required:true},
  password: {type: String, required:true}
});

module.exports = mongoose.model('User',postSchema);