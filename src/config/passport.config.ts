import passport from 'passport';
import {Strategy as localStrategy} from 'passport-local';
import bcrypt from 'bcrypt';

import { UserModel } from '../client/model/user.model';

passport.use(
    new localStrategy(
        { usernameField: 'email' },
        async (email: string, password: string, done) => {
            try {
                const user = await UserModel.findOne({
                    email: email,
                    status: 'active',
                    deleted: false
                })
                    .exec();
                if (!user) return done(null, false, {message: 'Tài khoản hoặc mật khẩu không đúng!'});
                const isMatch = await bcrypt.compare(password, user.password);
                if (!isMatch) return done(null, false, { message: 'Tài khoản hoặc mật khẩu không đúng!' });

                done(null, user, { message: 'Đăng nhập thành công!' });
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
        const user = await UserModel.findById(id).exec();
        done(null, user);
    } catch (err) {
        done(err);
    }
});

export default passport;
