const mongoose = require('mongoose');

const graphSchema = mongoose.Schema({
    firstLine: { type: [Number], require: true },
    secondLine: { type: [Number], require: true },
});

module.exports = mongoose.model('Graph', graphSchema);