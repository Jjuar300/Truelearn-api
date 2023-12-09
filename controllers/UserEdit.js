const User = require('../model/SignUpSchema')
const {hashPassword} = require('../helper/auth')

const updateUserProfileName = async (req, res) => {
   try{
      const {
         userId,
         newEmail, 
         newPassword,
         newFullName, 
      } = req.body
      const hashedPassword = await hashPassword(newPassword)
    
       await User.findByIdAndUpdate(userId,{
         firstname: newFullName, 
         email: newEmail, 
      })

      console.log(newFullName)
      console.log(newEmail)
      console.log(newPassword)

       if(newPassword === ''){
           return res.json({message: 'password was not updated'})
      }else{
         await User.findByIdAndUpdate(userId,{
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