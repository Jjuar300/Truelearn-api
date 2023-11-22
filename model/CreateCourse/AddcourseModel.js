const mongoose = require('mongoose')

const AddCourse = new mongoose.Schema({

    uploadvideo:{
        type:Boolean, 
        required, 
    }, 

    courseinfo: {
        type:Boolean, 
        required, 
    }, 

    createcoursebutton:{
        type:Boolean, 
        required, 
    }

})

const CreatingCourse = mongoose.Model('AddCourse', AddCourse)
module.exports =  CreatingCourse; 