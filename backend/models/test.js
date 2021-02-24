const mongoose = require ('mongoose');

const postSchema = mongoose.Schema({
  testDate: {type: Date, required:true},
  username: {type: String, required:true},
  patientType: {type: String, required:true},
  symptoms: {type: String, required:true},
  testStatus: {type: String, required:true},
  testResults: {type: String},
  testCentreOfficerUsername: {type: String}
});

module.exports = mongoose.model('Test',postSchema);
