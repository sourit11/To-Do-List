module.exports.remove = function(req, res){ 
    const Task = require('../models/tasks');

    var removeList = req.body.check;
    console.log(removeList);
    if(typeof removeList === "string"){
        Task.findByIdAndDelete(removeList, function(err){
            if(err){
                console.log('error');
                return;
            }
            console.log('Deleted');
        });
    }
    else if(typeof removeList === "object"){
        for(var i = 0 ; i < removeList.length ; i++){
            Task.findByIdAndDelete(removeList[i], function(err){
                if(err){
                    console.log('error');
                    return;
                }
            console.log('Deleted');

            });
        }
    }
    return res.redirect('/');
};