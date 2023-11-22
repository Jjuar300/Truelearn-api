const mongoose = require('mongoose')

const ImageFileName = new mongoose.Schema({imageName: String})

const imageName = mongoose.model('imageFileName', ImageFileName)
module.exports = imageName; 