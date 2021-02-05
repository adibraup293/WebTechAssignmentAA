const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  testcentreId: { type: String, required: true },
  testCentreOfficerName: { type: String, required: true },
  testCentrerUsername: { type: String, required: true },
  testCentrerPassword: { type: String, required: true }
});

module.exports = mongoose.model('tester', postSchema);
