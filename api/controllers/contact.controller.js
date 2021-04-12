const Contact = require('../models/contact.model');

// Find all  Contacts 
exports.findAll = (req, res) => {

    Contact.find({})
        .then(contacts => {
            if (!contacts) {
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

exports.insertOne = (req, res) => {
    this.validateContact(req, res)
    Contact.collection.insertOne(req.body)
        .then(contact => {
            if (!contact) {
                return res.status(404).send({
                    message: "contact not created"
                });
            }
            res.send(contact);
        }).catch(err => {

            return res.status(500).send({
                message: "Error contact not created"
            });
        });
};

exports.validateContact = (req, res) => {
    // Validate Contact data
    if (!req.body.id) {
        return res.status(400).send({
            message: "id can not be empty"
        });
    }

    else if (!req.body.name) {
        return res.status(400).send({
            message: "name can not be empty"
        });
    }
    else if (!req.body.type) {
        return res.status(400).send({
            message: "type can not be empty"
        });
    }
    else if (!req.body.picture) {
        return res.status(400).send({
            message: "picture can not be empty"
        });
    }
    else {
        contact.collection.find().then(contacts => {
            if (!contacts) {
            }
            else if (contacts.length > 0) {
                for (let i = 0; i < contacts.length; i++) {
                    if (contacts[i].id == req.body.id) {
                        return res.status(400).send({
                            message: "Id is already exists"
                        });
                    }
                }
            }
        })
    }
};

exports.updateOne = (req, res) => {
    Contact.collection.updateOne({ id: req.body.id }, req.body)
        .then(contact => {
            if (!contact) {
                return res.status(404).send({
                    message: "contact not updated"
                });
            }
            res.send(contact);
        }).catch(err => {

            return res.status(500).send({
                message: "Error contact not updated"
            });
        });
};

exports.deleteOne = (req, res) => {
    Contact.collection.deleteOne({ id: req.params.id })
        .then(contact => {
            if (!contact) {
                return res.status(404).send({
                    message: "contact not deleted"
                });
            }
            res.send(contact);
        }).catch(err => {

            return res.status(500).send({
                message: "Error contact not deleted"
            });
        });
};