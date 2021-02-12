const mongoose = require ('mongoose');

const postSchema = mongoose.Schema({
  testId: {type: String, required:true},
  testDate: {type: Date, required:true},
  patientUsername: {type: String, required:true},
  patientType: {type: String, required:true},
  symptoms: {type: String, required:true},
  testStatus: {type: String, required:true},
  testResults: {type: String, required:false}
});

module.exports = mongoose.model('Test',postSchema);
