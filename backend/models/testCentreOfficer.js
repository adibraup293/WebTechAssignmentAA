const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  testCentreId: { type: String, required: true },
  testCentreOfficerName: { type: String, required: true },
  testCentreOfficerUsername: { type: String, required: true },
  testCentreOfficerPassword: { type: String, required: true },
  testCentreOfficerPosition: { type: String, required: true},
  testCentreId: {type: String, required: true}
});

module.exports = mongoose.model('TestCentreOfficer', postSchema);
