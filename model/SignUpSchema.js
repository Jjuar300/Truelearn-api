const mongoose = require('mongoose')

const UserSignUp = new mongoose.Schema({

    firstname:{
        type:String, 
        required: true, 
        min:2,
        max:50,
    },
    
    email:{
    type: String, 
    required: true, 
    max: 50, 
    unique: false,
    }, 
    
    password: {
        type:String, 
        required:true, 
        min:5, 
    }, 
    
    picturepath:String, 

},
{timestamps: true}
)

const SignUpSchema = mongoose.model('UserSignup', UserSignUp); 
module.exports = SignUpSchema;