import passport from 'passport';
import {Strategy as localStrategy} from 'passport-local';
import bcrypt from 'bcrypt';

import {ManagerModel} from '../model/manager.model';

passport.use(
    'local-server',
    new localStrategy(
        {usernameField: 'email'},
        async (email: string, password: string, done) => {
            try {
                const manager = await ManagerModel.findOne({email, deleted: false}).exec();
                if (!manager) return done(null, false, {message: 'Tài khoản hoặc mật khẩu không đúng!'});
                if (manager.status === 'inactive') return done(null, false, {message: 'Tài khoản đã bị khóa!'});
                const isMatch = await bcrypt.compare(password, manager.password);
                if (!isMatch) return done(null, false, {message: 'Tài khoản hoặc mật khẩu không đúng!'});
                delete manager.password;
                done(null, manager);
            } catch (err) {
                done(err);
            }
        }
    )
)