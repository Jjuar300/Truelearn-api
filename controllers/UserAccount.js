const User = require('../model/SignUpSchema');
const SectionInput = require('../model/CreateCourse/AddSection');
const SearchInput = require('../model/SearchInput');
const UploadVideoModel = require('../model/CreateCourse/UploadVideoModel');
const CourseLandingPage = require('../model/CreateCourse/courseLandingPage');

const {deleteDocuments} = require('../helper/deleteDocuments');

const deleteAccount = async (req, res) => {
  
    try{

        const {
            userId, 
        } = req.body;
        
      await User.deleteOne({_id: userId});
      await deleteDocuments(SectionInput); 
      await deleteDocuments(SearchInput);  
      await deleteDocuments(CourseLandingPage); 
      await deleteDocuments(UploadVideoModel); 

       res.send({status:'ok', data: 'user has being deleted'})

      console.log(userId)

    }catch(error){
        console.log(error)
    }
}

module.exports = {
    deleteAccount, 
}