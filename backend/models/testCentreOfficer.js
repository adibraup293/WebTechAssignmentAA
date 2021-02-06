const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  testCentreId: { type: String, required: true },
  testCentreOfficerName: { type: String, required: true },
  testCentrerUsername: { type: String, required: true },
  testCentrerPassword: { type: String, required: true },
  testCentreId: {type: String, required: true}
});

module.exports = mongoose.model('TestCentreOfficer', postSchema);
