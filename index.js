const express = require('express')
const app = express()
const port = 3000
const MongoClient = require('mongodb').MongoClient;
const cors=require('cors')
const jwt=require('jsonwebtoken')
var bodyParser = require('body-parser')
var url = "mongodb+srv://user:pass@cluster0.dzfpv.gcp.mongodb.net/mydb?retryWrites=true&w=majority";
app.use(cors())
app.use(bodyParser.json())

function verifyToken(req,res,next){

if(!req.headers.authorization){
  return res.json({"msg":"Unauthorize request"});
}
let token=req.headers.authorization.split(' ')[1];
if(token==='null'){
  return res.json({"msg":"Unauthorize request"});
}
let payload=jwt.verify(token,"secret");
console.log(payload)
if(!payload){
  return res.json({"msg":"Unauthorize request"});
}
req.user=payload;
next();
}
app.get('/',verifyToken ,(req, res) => {
  res.json({msg:'Node JS Server Running'});
})
app.post('/user',(req,res)=>{
  //this route is for authenticate user
 var token= jwt.sign(req.body,"secret")
 jwt.verify(token,"secret")
  MongoClient.connect(url, function(err, db) {
    if (err)
    console.log(err)
    var dbo = db.db("mydb");
    dbo.collection("users").findOne({email:req.body.email,password:req.body.password},function(err, result) {
      if (err) throw err;
      console.log(result);
      db.close();
      let token=jwt.sign(req.body,"secret")
      if(result==null){
        res.json({msg:"Invalid email or password"})  
      }else
      res.json({token:token})
    });
  });
})
app.post('/users',(req,resp)=>{
//this route for save or register user to database
console.log(req.body)  
MongoClient.connect(url, function(err, db) {
  if (err)
  console.log(err)
  var dbo = db.db("mydb");
  dbo.collection("users").insertOne(req.body, function(err, res) {
    if (err) throw err;
    console.log("user registered successfully");
    db.close();
    let token=jwt.sign(req.body,"secret")
    resp.json({token:token});
  });
}); 
})
app.get('/products', (req, res) => {
  MongoClient.connect(url, function(err, db) {
    if (err)
    console.log(err)
    else{
      var dbo = db.db("mydb");
      dbo.collection("products").find({}).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        db.close();
        res.json({msg:result})
      });
    }
 
  });
})
app.get('/products/:id', (req, res) => {
  MongoClient.connect(url, function(err, db) {
    if (err)
    console.log(err)
    var dbo = db.db("mydb");
    dbo.collection("products").findOne({product_id:req.params.id},function(err, result) {
      if (err) throw err;
      console.log(result);
      db.close();
      res.json({msg:result})
    });
  });
})
app.post('/products', (req, resp) => {
  console.log(req.body)  
  MongoClient.connect(url, function(err, db) {
    if (err)
    console.log(err)
    var dbo = db.db("mydb");
    dbo.collection("products").insertOne(req.body, function(err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      db.close();
      resp.json({msg:'1 document inserted'});
    });
  });  
})
app.put('/products', (req, res) => {
  console.log(req.body)  
  MongoClient.connect(url, function(err, db) {
    if (err)
    console.log(err)
    var dbo = db.db("mydb");
    console.log(req.body)
    dbo.collection("products").updateOne({product_id:req.body.product_id},
      {$set:{product_name:req.body.product_name,
    product_price:req.body.product_price}}, function(err, resp) {
      if (err) throw err;
      console.log("1 document updated");
      db.close();
      res.json({msg:"1 document updated"})
    });
  })
  })
app.delete('/products/:id', (req, res) => {
    console.log(req.params.id)  
    MongoClient.connect(url, function(err, db) {
      if (err)
      console.log(err)
      var dbo = db.db("mydb");
      
      dbo.collection("products").deleteOne({product_id:req.params.id}, function(err, resp) {
        if (err) throw err;
        console.log("1 document deleted");
        db.close();
        res.json({msg:"1 document deleted"})
      });
    })
    })
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
