
const deleteDocuments = (model) => {
   return model.deleteMany({})
}

module.exports = {
    deleteDocuments, 
}