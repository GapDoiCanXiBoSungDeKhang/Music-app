import bcrypt from 'bcrypt';

export class authService {
    async register(fullName: string, email: string, password: string): Promise<void> {
        const existingUser = await UserModel.findOne({ email, deleted: false });
        if (existingUser) return null;

        const manager: {fullName: string, email: string, password: string} = {
            fullName: fullName,
            email: email,
            password: await bcrypt.hash(password, 10),
        }

        const newManager = await
    }
}
