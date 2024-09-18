import {v2 as cloudinary} from 'cloudinary'

import dotenv from 'dotenv'

dotenv.config()

cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.cloudinary_API_KEY,
    api_secret: process.env.cloudinary_API_SECRET
})

export async function uploadPfpImage (image,id){
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
    const autoCropUrl = cloudinary.url(id, {
        crop: 'auto',
        gravity: 'auto',
        width: 500,
        height: 500,
    });
    
    console.log(autoCropUrl);
    return uploadResult.url
    
} catch (error) {
        console.log("error when uploading image", error)
        return {error: error}
    }
}

export async function uploadPostImage (image,id){
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
    const autoCropUrl = cloudinary.url(id, {
        crop: 'auto',
        gravity: 'auto',
        width: 450,
    });
    
    console.log(autoCropUrl);
    return uploadResult.url
    
} catch (error) {
        console.log("error when uploading image", error)
        return {error: error}
    }
}

export async function uploadPetImage (image,id){
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
    const autoCropUrl = cloudinary.url(id, {
        crop: 'auto',
        gravity: 'auto',
        width: 400,
        height: 200,
    });
    
    console.log(autoCropUrl);
    return uploadResult.url
    
} catch (error) {
        console.log("error when uploading image", error)
        return {error: error}
    }
}
