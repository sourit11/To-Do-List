const express = require('express');
const path = require('path');
const app = express();
const port = 8000;
const db = require('./config/mongoose');
const Task = require('./models/tasks');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

var taskList = [];

app.get('/', function(req, res){
    Task.find({}, function(err, task){
        if(err){
            console.log("error in fetching tasks from db");
            return;
        }
        return res.render('home',{
            title: "To-Do App",
            task_list: task
        });
    });
});

app.post('/add-task', function(req, res){
    Task.create({
        name: req.body.name,
        category: req.body.category,
        date: req.body.date
    }, function(err, newTask){
        if(err){console.log('Error in creating a task!')
            return;}
            console.log('******', newTask);
            return res.redirect('/');
    })
});

app.post('/remove-task/', require('./routes/index'));

app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server ${err}`);
    }
    console.log(`Server is running on port: ${port}`);
});
