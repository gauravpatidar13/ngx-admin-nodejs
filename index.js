const express = require('express')
const app = express()
const port = 3000
// const MongoClient = require('mongodb').MongoClient;
const cors=require('cors')
const mongoose=require('mongoose');
var bodyParser = require('body-parser')
const userRoute=require('./api/routes/user.routes')
const graphRoute=require('./api/routes/graph.routes')
const contactRoute=require('./api/routes/contact.routes')
var url = "mongodb+srv://user:pass@cluster0.dzfpv.gcp.mongodb.net/mydb?retryWrites=true&w=majority";
app.use(cors())
app.use(bodyParser.json())
app.use(userRoute)
app.use(graphRoute)
app.use(contactRoute)
mongoose.connect(url,{useNewUrlParser:true}).then(()=>console.log('connection successfull'
)).catch((err)=>console.log(err));

app.get('/',(req, res) => {
  res.json({msg:'Node JS Server Running'});
})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
