const mongoose = require ('mongoose');

const postSchema = mongoose.Schema({
  patientId: {type: String, required:true},
  patientUsername: {type: Date, required:true},
  patientPassword: {type: String, required:true},
  patientFullname: {type: String, required:true},
  patientPosition: {type: String, required:true}
 });

module.exports = mongoose.model('Patient',postSchema);
