require('dotenv').config()
const AWS = require('aws-sdk')
const fs = require('fs')

const bucketName = process.env.AWS_S3_BUCKET; 
const region = process.env.AWS_S3_REGION;
const accessKeyId = process.env.AWS_S3_ACCESS_KEY; 
const secretAccessKey = process.env.AWS_S3_SECRET_ACCESS_KEY

const s3 = new AWS.S3({
    accessKeyId: accessKeyId, 
    secretAccessKey: secretAccessKey, 
    region: region,
})

const uploadToAwsS3 = (file) => {
   const fileStream = fs.createReadStream(file.path)
   
   const params = {
    Bucket: bucketName, 
    Key: file.originalname,
    Body: fileStream,
   }

   s3.upload(params, (error, data) => {
   console.log(data)
   if(error){ throw error} console.log(`File uploaded successfully. ${data.Location}`)
   })

}

module.exports = {
    uploadToAwsS3
}