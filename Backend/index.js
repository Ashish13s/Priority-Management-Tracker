var express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;
const task = require('./todo');
mongoose.connect(mongoString);
mongoose.Promise = global.Promise;
const database = mongoose.connection;

database.on('error' , (error) => {
    console.log(error);
})

database.once('connected', () => {
    console.log('Database Connected');
})

var app = express();
var PORT = 5000;

app.use(express.json());

app.listen(PORT, function(err){
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});

app.get('/' , function (req,res) {
    res.send("Server is Connected");
})

app.get('/task', async function (req, res,next) {
    let data= await task.find()
     return res.json({"data":data})
 })

app.get('/activetask', async function (req, res,next) {
    let data= await task.find()
     return res.json({"data":data})
 })

 app.get('/completedtask', async function (req, res,next) {
    let data= await task.find()
     return res.json({"data":data})
 })

app.post('/task/add', function (req, res) {
    let newTask= new task(req.body)
    // newMovie.name = req.body.name;
    // newMovie.year= req.body.year;
    // newMovie.rating=req.body.rating;
    newTask.save(function(err){
       if(err)
       res.json(err);
       res.json({
          data:newTask,
          mssg:"Successful update"
       })
    });
})

app.put('/task/update/:id', async function(req, res){
    let data= await task.findById(req.params.id)
    data.overwrite({task: req.body.task, done: req.body.done})
    await data.save();
    return res.json({"data":data})
 
  });
 
 app.delete('/task/delete/:id', async function(req, res){
    let data= await task.findOneAndDelete(req.params.id)
    return res.json({"Deleted Data":data })
 
 });

