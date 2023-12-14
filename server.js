
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const express = require('express')
dotenv.config(); 
const authroutes = require('./routes/authRoutes')
const app = express(); 
const cookieParser = require('cookie-parser')
const {upload} = require('./middleware/Multer')
const stripe = require('./routes/stripe')
const { uploadToAwsS3} = require('./services/s3')
const SectionInput = require('./model/CreateCourse/AddSection')
const UploadVideo = require('./model/CreateCourse/UploadVideoModel')
const User = require('./model/SignUpSchema')
const cors = require('cors')
const morgan = require('morgan')

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true, // This is important.
}

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://truelearn.onrender.com', 'https://d3n6kitjvdjlm1.cloudfront.net/',  "http://localhost:3000",);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });

app.use(cors(corsOptions))
app.use(cors('*'))
app.use(express.json())
app.use(cookieParser()); 
app.use(express.urlencoded({extended: false}));
const PORT = process.env.PORT || 3005; 
app.use(express.json({limit: '60mb'}))
app.use(express.urlencoded({extended: true, limit: '60mb'}))
app.use(morgan('common'))

app.use('/', authroutes)
app.use('/stripe', stripe)

app.post('/upload', async (req, res) => {
    try{
        const {introduction} = req.body; 
    UploadVideo.create({
        introduction: introduction, 
        videofilename: req.file.originalname
    })
    uploadToAwsS3(req.file)
    }catch(error){
        console.log(error)
    }
});

// app.post('/uploadsectiondata', async (req, res) => {
//    try{
//     console.log('fileName:',req.file.originalname)
//     console.log('file: ', req.file)
//     const {inputValue} = req.body;
//     SectionInput.create({
//        section:inputValue, 
//        sectionVideoFile: req.file.originalname, 
//      })
//    }catch(error){
//     console.log(error)
//    }
// });


app.put('/userfile',upload.single('file'),  async (req, res) => {
    const {userId} = req.body; 
  await  User.findByIdAndUpdate(userId, {
        picturepath: req.file.originalname
    })
    console.log('userfile:', req.file.originalname)
    console.log('userId:', userId)
})

console.log('hello from server')

 mongoose.connect(process.env.MONGO_DATABASE, {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
}).then(() => {
    app.listen(PORT, () => console.log(`server Port: ${PORT}`))
}).catch(err => console.log(`${err} did not connect`))


