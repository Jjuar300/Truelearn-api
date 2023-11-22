const SearchInput = require('../model/SearchInput')


const storeSearchInputValues = async (req, res) => {
const {
    searchInput, 
    isUpdated, 
} = req.body
const NewSearchInputValue = await SearchInput.create({
    inputResult: searchInput,
    isInput: isUpdated,  
}) 
NewSearchInputValue.save()
}

const sendSearchInputValues = async (req, res) => {
    try{
        SearchInput.find({})
        .then((data) => res.json(data))
        .catch((error) => console.log(error))
    }catch(error){
        console.log(error)
    }
    }
    
    const upadateSearchInputs = async (req, res) => {
        const {
            searchInput, 
            inputId, 
        } = req.body
        
        try{
      await SearchInput.updateOne(inputId, {inputResult: searchInput}) 
    }catch(error){
            console.log(error)
        }
    }


module.exports = {
    storeSearchInputValues, 
    sendSearchInputValues, 
    upadateSearchInputs,
}