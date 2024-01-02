const User = require('../model/SignUpSchema')
const {comparePassword, hashPassword} = require('../helper/auth')
const jwt = require('jsonwebtoken')

const test = (req, res) => {
    res.json('test is working')
}

const UserSignUp = async (req, res) => {
    try{
        const {
            firstname, 
            email, 
            password,
            picturePath,  
        } = req.body
   
        console.log('picturePath: ', picturePath)

        if(!firstname){
            return res.json({
                error: 'your firstname is required',
            })
        }

        if(!password || password.length < 6){
            return res.json({
                error: 'Password is required and should have at least 6 characters long'
            })
        }

        const EmailExist = await User.findOne({email})

        if(EmailExist){
            return res.json({
                error: 'Email is taken!'
            })
        }

        const hashedPassword = await hashPassword(password)

        const NewUser = await  User.create({
            firstname, 
            email, 
            password: hashedPassword,
            picturepath: picturePath, 
        })
 
        NewUser.save(); 
        res.json(NewUser)
        

    }catch(err){
        console.log(err);
    }
}

const UserSignIn = async (req, res) => {
try{
const {email, password} = req.body; 
const user = await User.findOne({email: email})
if(!user){
    return res.json({
        error: 'No user found!'
    })
}

const Match = await comparePassword(password, user.password)
if(Match){
   jwt.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn: '1h'}, (err, token) => {
    if(err) throw err; 
    res.cookie('token', token).json(user)
   })
};

if(!Match){
    res.json({
        error: 'Password do not match!'
    })
}

}catch(err){
console.log(err)
}

}


const getAuthorize = (req, res) => {
    const {token} = req.cookies; 
    console.log(token)
    if(token){
   jwt.verify(token, process.env.JWT_SECRET,{}, (err, user) => {
            if(err) throw err; 
            res.json(user)
        })
    }else{
        res.json(null)
    }
}



module.exports = {
    test, 
    UserSignUp, 
    UserSignIn, 
    getAuthorize, 
}