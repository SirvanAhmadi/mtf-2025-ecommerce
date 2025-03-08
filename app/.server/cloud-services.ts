
// import {S3Client,PutObjectCommand} from "@aws-sdk/client-s3";
// import { Upload } from "@aws-sdk/lib-storage";
import {config} from "dotenv";
import pkg from 'aws-sdk';
const {S3} = pkg;
config()



const bucketUrl = process.env.LIARA_BUCKET_NAME;
const endpoint = process.env.LIARA_ENDPOINT;
const accessKey = process.env.LIARA_ACCESS_KEY;
const secretKey = process.env.LIARA_SECRET_KEY;




export const uploadImage = async (image:File) => {
    const url = await getSignedUrl(image.name)

    const arrayBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const response = await fetch(url,{
        method: "PUT",
        body:buffer,
    })

    console.log(response);

    const data =  response.url;
    const location = data.split('?').shift()
    const key = location?.split("/").pop()

    return {
        Key: key,
        Location: location,
    };
}


export async function getSignedUrl(image_name: string) {

    const s3 = new S3({
        endpoint: endpoint,
        credentials:{
            accessKeyId:accessKey!,
            secretAccessKey:secretKey!,
        }
    });


    const params = {
        Bucket: bucketUrl,
        Key: image_name,
        Expires: 1000 * 60 * 10, // Expiration time in seconds
    };

    return s3.getSignedUrl("putObject",params);
}
