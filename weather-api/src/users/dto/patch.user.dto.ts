import { Users } from "../interfaces/users.schema";

export interface PatchUserDto extends Partial<Users>{ }