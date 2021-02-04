const mongoose = require ('mongoose');

const postSchema = mongoose.Schema({
  testcentrename: {type: String, required:true},
  testcentreaddress: {type: String, required:true},
  testcentrecontact: {type: Number, required:true}
});

module.exports = mongoose.model('TestCentre',postSchema);
