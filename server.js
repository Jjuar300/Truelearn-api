
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
const cors = require('cors')

const corsOptions = {
    origin: ['https://truelearn-api.onrender.com', 'https://d3n6kitjvdjlm1.cloudfront.net/'],
    credentials: true, // This is important.
  }

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://truelearn.onrender.com', 'https://d3n6kitjvdjlm1.cloudfront.net/');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });

app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser()); 
app.use(express.urlencoded({extended: false}));
const PORT = process.env.PORT || 3005; 
app.use(express.json({limit: '60mb'}))
app.use(express.urlencoded({extended: true, limit: '60mb'}))

app.use('/', authroutes)
app.use('/stripe', stripe)

app.post('/upload', (req, res) => {
    const {introduction} = req.body; 
    console.log('filePath: ', req.file.originalname)
    console.log('file:', req.file)
    UploadVideo.create({
        introduction: introduction, 
        videofilename: req.file.originalname
    })
    uploadToAwsS3(req.file)
});

app.post('/uploadsectiondata', (req, res) => {
    console.log('fileName:',req.file.originalname)
    console.log('file: ', req.file)
    const {inputValue} = req.body;
    SectionInput.create({
       section:inputValue, 
       sectionVideoFile: req.file.originalname, 
     })
});

app.post('/uploadvideo', (req, res) => { 
    uploadToAwsS3(req.file) 
    console.log('fileName: ',req.file.originalname)
})

 mongoose.connect(process.env.MONGO_DATABASE, {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
}).then(() => {
    app.listen(PORT, () => console.log(`server Port: ${PORT}`))
}).catch(err => console.log(`${err} did not connect`))


