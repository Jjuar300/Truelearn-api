const SectionInput = require('../model/CreateCourse/AddSection')
const UploadVideo = require('../model/CreateCourse/UploadVideoModel')

const sendCreateCourseInputs = async (req, res) => {

    try{
        UploadVideo.find({})
        .then((data) => res.json(data))
        .catch((error) => res.json(error))
    }catch(error){
        console.log(error)
    }
}

const sendSectionInput = async (req, res) => {

    try{
        SectionInput.find({})
        .then((data) => res.json(data))
        .catch((error) => res.json(error))
    }catch(error){
        console.log(error)
    }
}

module.exports = {
sendCreateCourseInputs,
sendSectionInput,  
}