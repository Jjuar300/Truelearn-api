const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        return cb(null, './uploads')
    }, 
     filename: (req, file, cb) => {
        return cb(null, file.originalname)
     }
})

 const upload = multer({
    storage: storage,  
    limits: {fileSize: 2 * 1024 * 1024 * 1024 }, 
})

module.exports = {
    upload, 
}