import bcrypt from 'bcrypt'

import {ManagerModel} from '../../../common/model/manager.model';
import {BlogUpdatedModel} from '../../../common/model/blog_updated.model'
import {IManager} from '../../../common/model/manager.model';

export class songService {
    async index() : Promise<IManager[]> {
        const filter = {status: 'active', deleted: false}
        const songs = await ManagerModel.find(filter).populate('roleId', 'title').exec();
        return songs;
    }

    async create(body): Promise<String> {
        const emailExist = await ManagerModel.findOne({email: body.email, deleted: false}).exec();
        if (emailExist) return 'Tài khoản đã tồn tại, vui lòng nhập email khác!';
        const createDataBlog = new BlogUpdatedModel();
        await createDataBlog.save();

        const dataManager: Record<string, any> = {
            fullName: body.fullName,
            email: body.email,
            phone: body.phone,
            password: await bcrypt.hash(body.password, 10),
            roleId: body.roleId,
            avatar: body.avatar,
            description: body.description,
            updatedBlogId: createDataBlog._id,
        }
        const createNewManager = new ManagerModel(dataManager);
        await createNewManager.save();
        return '';
    }
}