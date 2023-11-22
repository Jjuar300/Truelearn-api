const mongoose = require('mongoose')

const NavBar = new mongoose.Schema({

    truelearnlogo:Boolean, 
    signupButton: Boolean, 
    searchbar: Boolean, 
    hamburgerbutton: Boolean, 
    explorecoursebutton:Boolean, 
    createcoursebutton: Boolean, 
    signupdrawerbutton: Boolean, 
    signindrawerbutton: Boolean, 
    categoriesbubble: Array, 

    searchinput:{
        type:String, 
        required:true,
        min:2, 
        max:50,
    }, 

})

const Navbar = mongoose.model('navbar', NavBar)
module.exports = NavBar; 