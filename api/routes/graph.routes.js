let express = require('express')
let router = express.Router()
const GraphController=require('../controllers/graph.controller')
router.post('/graph', (req , res)=>{
    GraphController.create(req,res)
})

router.get('/graph', (req , res)=>{
    GraphController.find(req,res)
})
router.put('/graph', (req , res)=>{
    console.log(req.body)
    GraphController.updateOne(req,res)
})
router.delete('/graph/:id', (req , res)=>{
    console.log(req.params.id);
    GraphController.deleteOne(req,res)
})
module.exports  = router