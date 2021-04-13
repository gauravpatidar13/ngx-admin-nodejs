const Graph = require('../models/graph.model');

// Find Graph
exports.find = (req, res) => {
    Graph.find()
        .then(graph => {
            if (!graph) {
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
    this.validateGraph(req, res)
    this.saveGraph(req, res)
};
//this method we call after validation of graph data to save graph 
exports.saveGraph = (req, res) => {
    // Create a Graph
    const graph = new Graph({
        id: req.body.id,
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

exports.validateGraph = (req, res) => {
    // Validate Graph data
    if (!req.body.id) {
        return res.status(400).send({
            message: "id can not be empty"
        });
    }

    else if (!req.body.firstLine) {
        return res.status(400).send({
            message: "firstLine can not be empty"
        });
    }
    else if (!req.body.secondLine) {
        return res.status(400).send({
            message: "secondLine can not be empty"
        });
    }
    else {
        Graph.find().then(graph => {
            if (!graph) {
            }
            else if (graph.length > 0) {
                for (let i = 0; i < graph.length; i++) {
                    if (graph[i].id == req.body.id) {
                        return res.status(400).send({
                            message: "Id is already exists"
                        });
                    }
                }
            }
        })
    }
};
exports.deleteOne=(req,res)=>{
     Graph.deleteOne({ id: req.params.id })
        .then(graph => {
            if (!graph) {
                return res.status(404).send({
                    message: "graph not deleted"
                });
            }
            else if(graph.n==1)
            res.send(req.params.id);
            else
            res.send({msg:"graph not found with id"})
        }).catch(err => {

            return res.status(500).send({
                message: "Error graph not deleted"
            });
        });
}
exports.updateOne=(req,res)=>{
   Graph.updateOne({ id: req.body.id }, req.body)
        .then(graph => {
            if (!graph) {
                return res.status(404).send({
                    message: "graph not updated"
                });
            }
            res.send(req.body);
        }).catch(err => {

            return res.status(500).send({
                message: "Error graph not updated"
            });
        }); 
}