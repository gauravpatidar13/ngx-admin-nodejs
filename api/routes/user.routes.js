let express = require('express')
let router = express.Router()
const UserController=require('../controllers/user.controller')
router.post('/login', (req , res)=>{
  UserController.findOne(req,res)
})

router.post('/register', (req , res)=>{
    UserController.create(req,res)
})
module.exports  = router