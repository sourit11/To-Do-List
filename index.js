const express = require('express');
const path = require('path');
const app = express();
const port = 8000;

// use express router
// app.use('/', require('./routes'));

//set up view engine
app.set('view engine', 'ejs');
// app.set('views', './views');
app.set('views', path.join(__dirname, 'views'));
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
// app.use(express.urlencoded());

var taskList = [];

app.get('/', function(req, res){
    return res.render('home',{
        title: "To-Do App",
        task_list: taskList
    });
});

app.post('/add-task', function(req, res){
    taskList.push(req.body);
    return res.redirect('/');
});

app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server ${err}`);
    }
    console.log(`Server is running on port: ${port}`);
});

// app.get('/remove-task/', function(req, res){
//     console.log(req.query);
//     let name = req.query.name;

//     let taskindex = taskList.findIndex(task => taskList.name == name);

//     if(taskindex != -1){
//         taskList.splice(taskindex, 1);
//     }

//     return res.redirect('back');
// });

app.post("/remove-task/", function(req, res) {
    const checkedItemId = req.body.checkbox;
    console.log(checkedItemId);
    taskList.findByIdAndRemove(checkedItemId , function(err) {
      if (!err) {
        console.log("Successfully deleted the Id");
      }
      res.redirect("/");
    });
  });