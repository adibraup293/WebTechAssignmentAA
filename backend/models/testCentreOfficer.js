const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const postSchema = mongoose.Schema({
  testCentreId: { type: String},
  testCentreOfficerName: { type: String},
  testCentreOfficerUsername: { type: String, required: true },
  testCentreOfficerPassword: { type: String, required: true },
  testCentreOfficerPosition: { type: String}
});

postSchema.plugin(uniqueValidator);
module.exports = mongoose.model('TestCentreOfficer', postSchema);
