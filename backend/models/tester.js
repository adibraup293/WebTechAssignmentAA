const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    testerName: { type: String, required: true },
    testerPosition: { type: String, required: true },
    testcentreId: { type: String, required: true }
});

module.exports = mongoose.model('tester', postSchema);
