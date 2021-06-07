import {UserModel} from "../models";

export interface userService {
    isValid(user:UserModel): boolean;
}