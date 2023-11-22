const mongoose = require('mongoose')

const introductionInputSchema = new mongoose.Schema({

    introduction: {
        type: String, 
        min:5, 
        max: 50, 
    }, 

    videofilename: String, 
})

const UploadVideo = mongoose.model('introductionInputvalue',introductionInputSchema)
module.exports =  UploadVideo;
