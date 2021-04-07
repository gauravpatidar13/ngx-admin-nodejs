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

app.get('/',(req, res) => {
  res.json({msg:'Node JS Server Running'});
})
app.post('/login',(req,res)=>{
  //this route is for authenticate user

  MongoClient.connect(url, function(err, db) {
    if (err)
    console.log(err)
    var dbo = db.db("mydb");
    dbo.collection("users").findOne({email:req.body.email,password:req.body.password},function(err, result) {
      if (err) throw err;
      console.log(result);
      db.close();
     
      if(result==null){
        res.json({msg:"Invalid email or password"})  
      }else
      res.json({result:"login successfully"})
    });
  });
})
app.post('/save_graph_data',(req,resp)=>{
 console.log(req.body)  
MongoClient.connect(url, function(err, db) {
  if (err)
  console.log(err)
  var dbo = db.db("mydb");
  dbo.collection("graph").insertOne(req.body, function(err, res) {
    if (err) throw err;
    console.log("graph data added successfully");
    db.close();
    resp.json({result:"graph data added successfully"});
  });
});  
})
app.get('/graph',(req,resp)=>{
MongoClient.connect(url, function(err, db) {
    if (err)
    console.log(err)
    var dbo = db.db("mydb");
    dbo.collection("graph").find().toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      db.close();
     
      if(result==null){
        res.json({result:[]})  
      }else
      resp.json({result:result})
    });
  });
})
app.get('/contacts',(req,res)=>{
  //this route is for authenticate user

  MongoClient.connect(url, function(err, db) {
    if (err)
    console.log(err)
    var dbo = db.db("mydb");
    dbo.collection("contacts").find({}).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      db.close();
     
      if(result==null){
        res.json({result:[]})  
      }else
      res.json({result:result})
    });
  });
})
app.post('/register',(req,resp)=>{
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
    resp.json({result:res});
  });
}); 
})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
