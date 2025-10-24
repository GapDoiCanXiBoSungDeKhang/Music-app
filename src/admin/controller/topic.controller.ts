import {Request, Response} from 'express';

// service
import {TopicService} from '../service/topic.service';

const serviceInstance = new TopicService();

export class controller {
    async index(req: Request, res: Response) {
        res.render('client/pages/topics/topics', {
            titlePage: 'Trang chủ đề',
            topics: await serviceInstance.getTopics({
                deleted: false,
                status: 'active',
            })
        });
    }
}