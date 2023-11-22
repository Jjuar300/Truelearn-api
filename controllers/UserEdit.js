const User = require('../model/SignUpSchema')
const {hashPassword} = require('../helper/auth')

const updateUserProfileName = async (req, res) => {
   try{
      const {
         newEmail, 
         newPassword,
         newFullName, 
      } = req.body
      const hashedPassword = await hashPassword(newPassword)
    
      const user = await User.findOne({})
      
      console.log(user.password)

      console.log(newFullName)
      console.log(newEmail)
      console.log(newPassword)
      
      await User.updateMany({
         firstname: newFullName, 
         email: newEmail, 
      })
      
       if(newPassword === ''){
           return res.json({message: 'password was not updated'})
      }else{
         await User.updateMany({
            password: hashedPassword,
         })
         return res.json({message: 'password was updated'})
      } 

   }catch(error){
    console.log(error)
   }

}

const getUserProfileFullName = async (req, res) => {
   try{
      User.find({})
      .then((data) => res.json(data))
      .catch((error) => res.json(error))
   }catch(error){
      console.log(error)
   }
}

module.exports = {
    updateUserProfileName, 
    getUserProfileFullName, 
}