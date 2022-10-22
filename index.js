const express = require('express');
const app = express();
const port = 8000;

// use express router
app.use('/', require('./routes'));

//set up view engine
app.set('view engine', 'ejs');
app.set('views', './views');

var taskList = [
    {
        name: "Cooking",
        date: "23/09/2011",
        category: "Cleaning"
    }
];

app.get('/', function(req, res){
    return res.render('home',{
        title: "To-Do App",
        task_list: taskList
    });
});

app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server ${err}`);
    }
    console.log(`Server is running on port: ${port}`);
});