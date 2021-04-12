const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    fullname: { type: String, require: true },
    email: {
        type: String,
        validate: {
          validator: function(v) {
            return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
          },
          message: props => "${props.value} is not a valid email address."
        },
        required: true
      },
    password: { type: String, require: true },
});

module.exports = mongoose.model('User', userSchema);