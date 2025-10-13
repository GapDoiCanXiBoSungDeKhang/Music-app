import bcrypt from 'bcrypt';
import {UserModel} from '../model/user.model';

export class authService {
    async register(fullName: string, email: string, password: string) {
        const existingUser = await UserModel.findOne({ email, deleted: false });
        if (existingUser) return null;

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await UserModel.create({
            fullName,
            email,
            password: hashedPassword,
        });

        return newUser;
    }
}
