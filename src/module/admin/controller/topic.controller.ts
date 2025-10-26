import {Request, Response} from 'express';

// service
import {topicService} from '../service/topic.service';
const serviceInstance = new topicService();

export class controller {
    async index(req: Request, res: Response) {
        const topics = await serviceInstance.index();
        res.render('admin/pages/topics/list', {
            titlePage: 'Quản lý chủ đề',
            topics,
        });
    }
}