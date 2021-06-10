import {UserModel} from "../models";

export interface userService {
    getUserById(userId:number): Promise<UserModel | null> ;
    createUser(user:UserModel): Promise<UserModel | null> ;
    isValid(user:UserModel): boolean;

}