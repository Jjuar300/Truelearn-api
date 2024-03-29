const {upload} = require('../middleware/Multer')
const express = require('express')
const router = express.Router(); 
const {test, UserSignUp, UserSignIn, getAuthorize } = require('../controllers/authController')
const {
    sendCreateCourseInputs, 
    sendSectionInput,  
} = require('../controllers/UploadVideoSection')
const { 
    storeSearchInputValues, 
    sendSearchInputValues,
    upadateSearchInputs
} = require('../controllers/searchBar')
const {
    getCourseLandingPageInputValues, 
    SendCourseLandingPageInputValues
} = require('../controllers/courseLandingPageController')
const {
    updateUserProfileName, 
    getUserProfileFullName, 
} = require('../controllers/UserEdit')
const {deleteAccount} = require('../controllers/UserAccount')
const {deleteCourse} = require('../controllers/userCourseCard')
const {getUser} = require('../controllers/user')
const cors = require('cors')

const corsOptions = {
    origin: 'https://truelearn.onrender.com',
    credentials: true, // This is important.
  }

router.use(cors(corsOptions))

//Authentication & Authorization
router.get('/', test)

router.post('/usersignup', UserSignUp)
router.post('/usersignin', UserSignIn)
router.get('/authorization', getAuthorize)
router.get('/usersignin', UserSignIn)

//CreateCourse section 
// router.post('/uploadvideocontent', getInfoForUploadVideo)
router.post('/uploadcourselandingpage', getCourseLandingPageInputValues )
router.get('/uploadcourselandingpage', getCourseLandingPageInputValues )
router.get('/uploadCourseLandingInputValues',  SendCourseLandingPageInputValues)
router.get('/createcoursedata', sendCreateCourseInputs);
router.get('/sectioninput',sendSectionInput)

//search section 
router.post('/searchinputs', storeSearchInputValues)
router.get('/getsearchinputs', sendSearchInputValues)
router.put('/upadatesearchinputs', upadateSearchInputs)

//User edit page
router.put('/updatefullname', updateUserProfileName)
router.get('/userData', getUserProfileFullName)

//Delete user account
router.post('/deleteacount', deleteAccount)

//user
router.get('/user', getUser)

//delete user course
router.post('/deletecoursecard', deleteCourse)

module.exports = router; 
