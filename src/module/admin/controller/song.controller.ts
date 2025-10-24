import {NextFunction, Request, Response} from 'express';

import {songService} from '../service/song.service';
const serviceInstance = new songService();

export class controller {
    index(req: Request, res: Response) {
        const songs = [
            {
                _id: '671888fa0d2b5c9f8a12b001',
                title: 'Nơi Này Có Anh',
                singerName: 'Sơn Tùng M-TP',
                topicName: 'Pop',
                views: 1254300,
                likes: 98412,
                status: 'active'
            },
            {
                _id: '671888fa0d2b5c9f8a12b002',
                title: 'Tháng Năm',
                singerName: 'Soobin Hoàng Sơn',
                topicName: 'Ballad',
                views: 834921,
                likes: 65120,
                status: 'active'
            },
            {
                _id: '671888fa0d2b5c9f8a12b003',
                title: 'Waiting For You',
                singerName: 'MONO',
                topicName: 'Pop',
                views: 2403981,
                likes: 134522,
                status: 'active'
            },
            {
                _id: '671888fa0d2b5c9f8a12b004',
                title: 'Một Bước Yêu, Vạn Dặm Đau',
                singerName: 'Mr. Siro',
                topicName: 'Ballad',
                views: 1975000,
                likes: 122540,
                status: 'inactive'
            },
            {
                _id: '671888fa0d2b5c9f8a12b005',
                title: 'Em Gì Ơi',
                singerName: 'Jack - K-ICM',
                topicName: 'Dance',
                views: 1543021,
                likes: 105330,
                status: 'active'
            }
        ];

        res.render('admin/pages/songs/list', {
            titlePage: 'Quản lý bài hát',
            songs,
        });
    }
}