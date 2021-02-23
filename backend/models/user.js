const mongoose = require ('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  email: {type: String, required: true, unique:true},
  username: {type: String},
  password: {type: String, required: true},
  name: {type: String},
  position: {type:String},
  type: {type:String},
  centreId: {type:String}

});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
