
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const express = require('express');
dotenv.config(); 
const authroutes = require('./routes/authRoutes');
const app = express(); 
const cookieParser = require('cookie-parser');
const {upload} = require('./middleware/Multer');
const stripe = require('./routes/stripe');
const { uploadToAwsS3} = require('./services/s3');
const SectionInput = require('./model/CreateCourse/AddSection');
const UploadVideo = require('./model/CreateCourse/UploadVideoModel');
const User = require('./model/SignUpSchema');
const cors = require('cors');
const morgan = require('morgan');
const http = require('http');
const PORT = process.env.PORT || 3005; 
const {Server} = require('socket.io');
const ImageKit = require('imagekit');
const UserCourseInfo = require('./model/CreateCourse/UserCourseInfo')

const imageKit = new ImageKit({
    urlEndpoint: 'https://ik.imagekit.io/4pwok1cjp/', 
    publicKey: 'public_GjEtjvvBdROHsJ46QIVXwiNKWGo=', 
    privateKey: 'private_UeH6n0ZN5vg2m0bVlSaGGLnRyec=', 
})

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true, 
    methods: ["GET", "POST", "PUT", "DELETE"]
}

const httpServer = http.createServer(app)

httpServer.listen(PORT, () => {
    console.log('SERVER RUNNING IN PORT', PORT)
})

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", 
      "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(cors(corsOptions))
app.use(cors('*'))
app.use(express.json())
app.use(cookieParser()); 
app.use(express.urlencoded({extended: false}));
app.use(express.urlencoded({extended: true, limit: '60mb'}))
app.use(morgan('common'))

app.use('/', authroutes)
app.use('/stripe', stripe)

app.get('/auth', (req, res) => {
    const result = imageKit.getAuthenticationParameters();
    res.send(result)
})

 mongoose.connect(process.env.MONGO_DATABASE, {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
}).then(() => {
    // app.listen(PORT, () => console.log(`server Port: ${PORT}`))
}).catch(err => console.log(`${err} did not connect`))
