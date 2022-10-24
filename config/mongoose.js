//require library
const mongoose = require('mongoose');

//connect to db
mongoose.connect('mongodb://localhost/todo_list_db');

//acquire connection to check if successful
const db = mongoose.connection;

// error
db.on('error', console.error.bind(console, 'error connecting to db'));

//up and running
db.once('open', function(){
    console.log('Successfully connected to db');
});