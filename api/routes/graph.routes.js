let express = require('express')
let router = express.Router()
const GraphController=require('../controllers/graph.controller')
router.post('/graph', (req , res)=>{
    GraphController.create(req,res)
})

router.get('/graph', (req , res)=>{
    GraphController.find(req,res)
})
module.exports  = router