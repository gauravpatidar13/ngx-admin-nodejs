let express = require('express')
let router = express.Router()
const ContactController=require('../controllers/contact.controller')
router.get('/contacts', (req , res)=>{
    ContactController.findAll(req,res)
})
module.exports  = router