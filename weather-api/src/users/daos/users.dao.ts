import debug from "debug";
import shortid from "shortid";
import mongooseService from "../../common/services/mongoose.service";
import { CreateUserDto } from "../dto/create.user.dto";
import { PatchUserDto } from "../dto/patch.user.dto";
import { PutUserDto } from "../dto/put.user.dto";
import { Users } from "../interfaces/users.schema";

const logger: debug.IDebugger = debug("weather-api:mongoose-user-dao");

class UsersDao {
    public Schema = mongooseService.getMongoose().Schema;
    public userSchema = new this.Schema<Users>({
        _id: String,
        login: String,
        password: { type: String, select: false },
        permissionLevel: Number,
    }, { id: false });
    public User = mongooseService.getMongoose().model("Users", this.userSchema);

    constructor() {
        logger("Created new instance of UsersDao");
    }

    async getUserById(userId: string) {
        return this.User
            .findOne({ _id: userId })
            .exec();
    }

    async getUserByLogin(login: string) {
        return this.User
            .findOne({ login: login })
            .exec();
    }

    async getUserByLoginWithPassword(login: string) {
        return this.User
            .findOne({ login: login })
            .select("_id login permissionLevel +password")
            .exec();
    }

    async addUser(userForm: CreateUserDto) {
        const userId = shortid.generate();
        const user = new this.User({
            _id: userId,
            ...userForm,
            permissionLevel: 1,
        });
        await user.save();

        return userId;
    }

    async updateUserById(
        userId: string,
        userForm: PatchUserDto | PutUserDto
    ) {
        const targetUser = await this.User
            .findOneAndUpdate(
                { _id: userId },
                { $set: userForm },
                { new: true }
            ).exec();

        return targetUser;
    }

    async removeUserById(userId: string) {
        return this.User
            .deleteOne({ _id: userId })
            .exec();
    }
}

export default new UsersDao();