import passport from 'passport';
import {Strategy as localStrategy} from 'passport-local';
import bcrypt from 'bcrypt';

import {UserModel} from '../client/model/user.model';
import '../client/model/songLike.model';
import '../client/model/songFavourite.model';
import '../client/model/songView.model';

passport.use(
    new localStrategy(
        {usernameField: 'email'},
        async (email: string, password: string, done) => {
            try {
                const user = await UserModel.findOne({
                    email,
                    deleted: false
                })
                    .exec();
                if (!user) return done(null, false, {message: 'Tài khoản hoặc mật khẩu không đúng!'});
                if (user.status === 'inactive') return done(null, false, {message: 'Tài khoản đã bị khóa!'});
                const isMatch = await bcrypt.compare(password, user.password);
                if (!isMatch) return done(null, false, {message: 'Tài khoản hoặc mật khẩu không đúng!'});
                delete user.password;
                done(null, user);
            } catch (err) {
                done(err);
            }
        }
    )
)

// Serialize user (lưu id vào session)
passport.serializeUser((user: any, done) => {
    done(null, user._id);
});

// Deserialize user (lấy thông tin user từ id)
passport.deserializeUser(async (id, done) => {
    try {
        const user = await UserModel.findById(id)
            .populate('listLikesSong', 'listId')
            .populate('listFavoritesSong', 'listId')
            .populate('listViewsSong', 'listId')
            .select('-password')
            .exec();
        done(null, user);
    } catch (err) {
        done(err);
    }
});

export default passport;
