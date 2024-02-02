const mongoose = require('mongoose')

// how do i add data into this schema even if is not at the same time. 

const courseSections = new mongoose.Schema({
  title: String, 
  filename: String, 
})

const UserCourseInfo = new mongoose.Schema({
    
    userid: Object, 

        introduction: {
          title: String, 
          filename: String,   
        },
        sections:[{
          title: String, 
          filename: String, 
        }],

    CourseLandingPage: {
      title: String, 
      description: String, 
      price: Number,
      category: String, 
      filename: String,  
    }, 
},
{timestamps: true}
); 

const userCourseInfo = mongoose.model('userInfo', UserCourseInfo)
module.exports = userCourseInfo; 