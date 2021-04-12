const mongoose = require('mongoose');

const graphSchema = mongoose.Schema({
    id:{type:number,require:true},
    firstLine: { type: [Number], require: true },
    secondLine: { type: [Number], require: true },
});

module.exports = mongoose.model('Graph', graphSchema);