const mongoose = require ('mongoose');

const postSchema = mongoose.Schema({
  testcentrename: {type: String, required:true}
});

module.exports = mongoose.model('TestCentre',postSchema);
