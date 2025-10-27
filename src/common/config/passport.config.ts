import passport from 'passport';

import {UserModel} from '../model/user.model';
import {ManagerModel} from '../model/manager.model';

// Serialize user (lưu id vào session)
passport.serializeUser((user: any, done) => {
    const role = user.roleId ? 'server' : 'client';
    done(null, { _id: user._id, role });
});

// Deserialize user (lấy thông tin user từ id)
passport.deserializeUser(async (data, done) => {
    try {
        if (data['role'] === 'server') {
            const manager = await ManagerModel.findById(data['_id'])
                .populate('createdBy.managerId', 'fullName')
                .populate({path: 'updatedBlogId', populate: {path: 'list_blog.managerId', select: 'fullName'}})
                .populate('roleId')
                .select('-password')
                .exec();
            done(null, manager);
        } else {
            const user = await UserModel.findById(data['_id'])
                .populate('listLikesSong', 'listId')
                .populate('listFavoritesSong', 'listId')
                .populate('listViewsSong', 'listId')
                .select('-password')
                .exec();
            done(null, user);
        }
    } catch (err) {
        done(err);
    }
});
