const mongoose = require('mongoose')

const SearchInputSchema = new mongoose.Schema({
    inputResult: String, 
    isInput:Boolean, 
})

const Search = mongoose.model('SearchInputValues', SearchInputSchema)
module.exports = Search; 