const mongoose = require('mongoose')

const CourseLandingPageSchema = new mongoose.Schema({

    title: {
        type:String, 
    }, 

    description: {
        type:String,
    }, 

   price: {
    type:Number, 
   }, 

   catergory: {
    type:String, 
   }, 
  
   filename: String, 
   userId: mongoose.Types.ObjectId
})

const CourseLandingPage = mongoose.model('CourseLandingPage', CourseLandingPageSchema)
module.exports = CourseLandingPage; 