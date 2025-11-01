import {PermissionModel} from '../../../common/model/permission.model';
import {RoleModel} from '../../../common/model/role.model';

export class roleService {
    async create(body): Promise<void> {
        const createNewPermission = new PermissionModel();
        await createNewPermission.save();
        const dataRole: Record<string, any> = {
            title: body.title,
            description: body.description,
            permissions: createNewPermission._id,
        };
        const createRoleData = new RoleModel(dataRole);
        await createRoleData.save();
    }
}