import {TopicModel} from '../../model/topic.model'

export class TopicService {
    async getTopics({deleted, status}: { deleted: boolean, status: string }) {
        const topics = await TopicModel.find({
            deleted,
            status
        })
        return topics
    }
}