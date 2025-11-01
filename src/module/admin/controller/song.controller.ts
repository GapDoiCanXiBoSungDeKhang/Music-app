import {Request, Response} from 'express';


import {SingerModel} from '../../../common/model/singer.model';
import {TopicModel} from '../../../common/model/topic.model';

import {songService} from '../service/song.service';
import {SongModel} from "../../../common/model/song.model";
import mongoose from "mongoose";
const serviceInstance = new songService();

export class controller {
    async index(req: Request, res: Response) {
        const songs = await serviceInstance.index();
        res.render('admin/pages/songs/list', {
            titlePage: 'Quản lý bài hát',
            songs,
        });
    }

    async create(req: Request, res: Response) {
        const filter = {status: 'active', deleted: false};
        res.render('admin/pages/songs/create.pug', {
            titlePage: 'Thêm mới bài hát',
            singers: await SingerModel.find(filter).select('fullName'),
            topics: await TopicModel.find(filter).select('title')
        });
    }

    async createPost(req: Request, res: Response) {
        try {
            await serviceInstance.create(req.body);
            req.flash('success', 'Tạo mới bài hát thành công!');
        } catch (e) {
            req.flash('error', 'Lỗi tạo bài hát');
        }
        res.redirect(req.get('Referrer') || '/');
    }

    async edit(req: Request, res: Response) {
        res.render('admin/pages/songs/edit.pug', {
            titlePage: 'Trang chỉnh sửa',
            song: await SongModel.findOne({_id: req.params.id, status: 'active', deleted: false})
        });
    }

    async detail(req: Request, res: Response) {
        res.render('admin/pages/songs/detail.pug', {
            titlePage: 'Trang chi tiết',
            song: await SongModel.findOne({_id: req.params.id, status: 'active', deleted: false})
                .populate('singerId', 'fullName')
                .populate('topicId', 'title')
                .exec()
        })
    }
}