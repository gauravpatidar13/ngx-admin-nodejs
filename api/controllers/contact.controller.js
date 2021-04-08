const Contact = require('../models/contact.model');

// Find all  Contacts 
exports.findAll = (req, res) => {
    
    Contact.find({})
    .then(contacts => {
        if(!contacts) {
            return res.status(404).send({
                message: "contacts not found"
            });            
        }
        res.send(contacts);
    }).catch(err => {
 
        return res.status(500).send({
            message: "Error retrieving contacts"
        });
    });
};