let express = require('express')
let router = express.Router()
const ContactController=require('../controllers/contact.controller')
router.get('/contacts', (req , res)=>{
    ContactController.findAll(req,res)
})
router.post('/contacts', (req , res)=>{
    ContactController.insertOne(req,res)
})
router.put('/contacts', (req , res)=>{
    ContactController.updateOne(req,res)
})
router.delete('/contacts/:id', (req , res)=>{
    ContactController.deleteOne(req,res)
})
module.exports  = router