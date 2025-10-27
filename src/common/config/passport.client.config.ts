import passport from 'passport';
import {Strategy as localStrategy} from 'passport-local';
import bcrypt from 'bcrypt';

import {UserModel} from '../model/user.model';

passport.use(
    'local-client',
    new localStrategy(
        {usernameField: 'email'},
        async (email: string, password: string, done) => {
            try {
                const user = await UserModel.findOne({email, deleted: false}).exec();
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