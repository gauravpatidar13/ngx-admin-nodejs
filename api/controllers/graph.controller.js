const Graph = require('../models/graph.model');

// Find Graph
exports.find = (req, res) => {
    
    Graph.find()
    .then(graph => {
        if(!graph) {
            return res.status(404).send({
                message: "graph not found"
            });            
        }
        res.send(graph);
    }).catch(err => {
 
        return res.status(500).send({
            message: err
        });
    });
};

exports.create = (req, res) => {
    // Validate request
    if(!req.body.firstLine) {
        return res.status(400).send({
            message: "firstLine can not be empty"
        });
    }
    else if(!req.body.secondLine) {
        return res.status(400).send({
            message: "secondLine can not be empty"
        });
    }

    // Create a Graph
    const graph = new Graph({
        firstLine: req.body.firstLine, 
        secondLine: req.body.secondLine
    });

    // Save User in the database
    graph.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the graph."
        });
    });
};