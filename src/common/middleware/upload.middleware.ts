import {Request, Response, NextFunction} from 'express';
import streamifier from 'streamifier';
import {v2 as cloudinary} from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

const streamUpload = (buffer: any) => {
    return new Promise((resolve, reject) => {
        let stream = cloudinary.uploader.upload_stream(
            {resource_type: 'auto'},
            (error, result) => {
                if (result) {
                    resolve(result);
                } else {
                    reject(error);
                }
            }
        );

        streamifier.createReadStream(buffer).pipe(stream);
    });
};

const uploadCloud = async (buffer: any) => {
    let res = await streamUpload(buffer);
    return res['url'];
};

export const uploadSingle = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const res = await uploadCloud(req['file'].buffer);
        req.body[req['file'].fieldname] = res;
    } catch (err) {
        console.log(err);
    }
    next();
}

export const uploadFields = async (req: Request, res: Response, next: NextFunction) => {
    for (const key in req.files) {
        req.body[key] = [];

        const array = req.files[key];
        for (const item of array) {
            try {
                const res = await uploadCloud(item.buffer);
                req.body[key].push(res);
            } catch (err) {
                console.log(err);
            }
        }
    }
    next();
}
