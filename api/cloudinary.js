import {v2 as cloudinary} from 'cloudinary'

import dotenv from 'dotenv'

dotenv.config()

cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.cloudinary_API_KEY,
    api_secret: process.env.cloudinary_API_SECRET
})

async function uploadAndTransformImage (image,id){
    try {
        const uploadResult = await cloudinary.uploader.upload(
           image,
            {
                id: id
            }
            
        );
        console.log(uploadResult)

        const optimizeUrl = cloudinary.url(id,{
            fetch_format: 'auto',
            quality: 'auto',
        });
        console.log(optimizeUrl)

         // Transform the image: auto-crop to square aspect_ratio
    const autoCropUrl = cloudinary.url('shoes', {
        crop: 'auto',
        gravity: 'auto',
        width: 500,
        height: 500,
    });
    
    console.log(autoCropUrl);
    
} catch (error) {
        console.log("error when uploading image", error)
    }
}

uploadAndTransformImage("https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp","cat")