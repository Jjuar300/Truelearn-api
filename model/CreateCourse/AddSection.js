const mongoose = require('mongoose')

const sectionInputSchema = new mongoose.Schema({
    section: String,
    sectionVideoFile: String, 
},)

const SectionInput = mongoose.model('SectionInputs', sectionInputSchema)
module.exports = SectionInput; 