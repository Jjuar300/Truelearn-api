const CourseLandingPage = require('../model/CreateCourse/courseLandingPage')

const deleteCourse = async (req, res) => {

    const {courseId} = req.body; 
     await CourseLandingPage.deleteOne({_id: courseId})

}

module.exports = {
    deleteCourse,
}