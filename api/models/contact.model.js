const mongoose = require('mongoose');

const ContactSchema = mongoose.Schema({
    id:{type:Number,require:true},
    name: { type: String, require: true },
    picture: { type: String, require: true },
    type: { type: String, require: true }
});

module.exports = mongoose.model('Contact', ContactSchema);