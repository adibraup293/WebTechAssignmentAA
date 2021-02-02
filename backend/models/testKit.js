const mongoose = require ('mongoose');

const postSchema = mongoose.Schema({
  testkitname: {type: String, required:true},
  testkitstock: {type: Number, required:true}
});

module.exports = mongoose.model('TestKit',postSchema);
