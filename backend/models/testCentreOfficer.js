const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  testCentreId: { type: String},
  testCentreOfficerName: { type: String},
  testCentreOfficerUsername: { type: String, required: true },
  testCentreOfficerPassword: { type: String, required: true },
  testCentreOfficerPosition: { type: String}
});

module.exports = mongoose.model('TestCentreOfficer', postSchema);
