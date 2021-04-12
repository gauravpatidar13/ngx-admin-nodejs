const User = require('../models/user.model');

// Create and Save a new User
exports.create = (req, res) => {
    // Validate request
    if(!req.body.fullname) {
        return res.status(400).send({
            message: "fullname can not be empty"
        });
    }
    else if(!req.body.email) {
        return res.status(400).send({
            message: "email can not be empty"
        });
    }
    else if(!req.body.password) {
        return res.status(400).send({
            message: "password can not be empty"
        });
    }
//check email already exists in database
User.find({email:req.body.email}).then(data=>{
    if(data.length!=0){
        console.log(data)
        res.json({error:"Email Already Registered"})
    }
   
    else{
  // Create a User
  const user = new User({
    fullname: req.body.fullname, 
    email: req.body.email,
    password:req.body.password
});

// Save User in the database
user.save()
.then(data => {
    res.send(data);
}).catch(err => {
    res.status(500).send({
        message: err.message || "Some error occurred while creating the User."
    });
});
    }
})

  
};



// Find a single User with email and password
exports.findOne = (req, res) => {
    
    User.find({email:req.body.email,password:req.body.password})
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with email and password "
            });            
        }
        res.send(user);
    }).catch(err => {
 
        return res.status(500).send({
            message: "Error retrieving User"
        });
    });
};



  

