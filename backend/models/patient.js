const mongoose = require ('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const postSchema = mongoose.Schema({
  email: {type: String, required:true},
  patientUsername: {type: String, required:true},
  patientPassword: {type: String, required:true},
  patientFullName: {type: String},
  patientPosition: {type: String}
 });

//postSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Patient', postSchema);
