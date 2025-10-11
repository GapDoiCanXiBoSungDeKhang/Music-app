import * as mongoose from 'mongoose';

export const connect = (URL: string): void => {
    try {
        mongoose.connect(URL);
        console.log('MongoDB Connected');
    } catch (err: any) {
        console.log(err);
        console.log('MongoDB Connect Failed');
    }
}