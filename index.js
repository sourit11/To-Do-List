const express = require('express');
const path = require('path');
const app = express();
const port = 8000;
const db = require('./config/mongoose');
const Task = require('./models/tasks');

// use express router
 

//set up view engine
app.set('view engine', 'ejs');
// app.set('views', './views');
app.set('views', path.join(__dirname, 'views'));
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
// app.use(express.urlencoded());

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
    //taskList.push(req.body);
    // return res.redirect('/');

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

// app.post('/remove-task/', function(req, res){
//     console.log(req.query);
//     let name = req.query.name;

//     // let taskindex = taskList.findIndex(task => taskList.name == name);

//     // if(taskindex != -1){
//     //     taskList.splice(taskindex, 1);
//     //}
//     return res.redirect('back');
// });

// module.exports.remove = function(req, res){ 
    
//     // const checkedItemId = req.body.checkbox;
//     // console.log(checkedItemId);

//     var removeList = req.body.check;
//     console.log(removeList);
//     if(typeof removeList === "string"){
//         Task.findByIdAndDelete(removeList, function(err){
//             if(err){
//                 console.log('error');
//                 return;
//             }
//             console.log('Deleted');
//         });
//     }
//     else if(typeof removeList === "object"){
//         for(var i = 0 ; i < removeList.length ; i++){
//             Task.findByIdAndDelete(removeList[i], function(err){
//                 if(err){
//                     console.log('error');
//                     return;
//                 }
//             console.log('Deleted');

//             });
//         }
//     }
//     return res.redirect('/');
//     // Task.findByIdAndDelete(checkedItemId , function(err) {
//     //     if (!err) {
//     //         console.log("Successfully deleted the Id");
//     //     }
//     //     res.redirect("/");
//     // });
// };