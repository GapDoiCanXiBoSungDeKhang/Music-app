import {TopicModel} from '../../../common/model/topic.model';

import {ITopic} from '../../../common/model/topic.model';

export class topicService {
    async index() : Promise<ITopic[]> {
        const filter = {status: 'active', deleted: false}
        const topics = await TopicModel.find(filter).exec();
        return topics;
    }
}