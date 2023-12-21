const mongoose = require('mongoose')
const CourseLandingPage = require('../model/CreateCourse/courseLandingPage')


const getCourseLandingPageInputValues = async (req, res) => {

    try{

        const{
            title, 
            description, 
            price, 
            catergory, 
            fileName, 
            userId, 
        } = req.body; 

        const newCourseLandingPage = await CourseLandingPage.create({
            title:title, 
            description: description, 
            price: price, 
            catergory: catergory,
            filename: fileName, 
            userId: userId, 
        })

        newCourseLandingPage.save();  
        console.log(`courseLandingPage: ${title,description}`)
    }catch(error){
        console.log(error)
    }

}

const SendCourseLandingPageInputValues = async (req, res) => {
try{

 CourseLandingPage.find({})
 .then(data => res.json(data))
 .catch(err => res.json(err))

}catch(error){
    console.log(error)
}

}

module.exports = {
    getCourseLandingPageInputValues,
    SendCourseLandingPageInputValues
}