import { PatchUserDto } from "../dto/patch.user.dto";
import { ServiceOperations } from "../../common/interfaces/service.operations.interface";
import UsersDao from "../daos/users.dao";
import { CreateUserDto } from "../dto/create.user.dto";
import { PutUserDto } from "../dto/put.user.dto";

class UsersService implements ServiceOperations<any, PutUserDto, PatchUserDto>{
    async readById(id: string) {
        return UsersDao.getUserById(id);
    }

    async readByLogin(login: string) {
        return UsersDao.getUserByLogin(login);
    }

    async readByLoginWithPassword(login: string) {
        return UsersDao.getUserByLoginWithPassword(login);
    }
    
    async create(resource: CreateUserDto) {
        return UsersDao.addUser(resource);
    }

    async putById(id: string, resource: PutUserDto) {
        return UsersDao.updateUserById(id, resource);
    }

    async patchById(id: string, resource: PatchUserDto) {
        return UsersDao.updateUserById(id, resource);
    }

    async deleteById(id: string) {
        return UsersDao.removeUserById(id);
    }
}

export default new UsersService();