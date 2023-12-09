const User = require('../model/SignUpSchema')
const {comparePassword} = require('../helper/auth')

const getUser = async (req, res) => {
try{
  const {email} = req.body; 
  

}catch(error){
    console.log(error)
}
}

module.exports = {
    getUser, 
}