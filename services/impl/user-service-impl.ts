import {userService} from "../user-service";
import moment from "moment";
import {UserModel} from "../../models";
import { Connection } from "mysql2/promise";
import { UserController } from "../../controllers/user.controller";

export class UserServiceImpl implements userService{

    connection: Connection;
    userController: UserController;

    constructor(connection: Connection) {
        this.connection = connection;
        this.userController = new UserController(this.connection);
    }
    
    createUser(options:UserModel): Promise<UserModel | null> {
        return this.userController.createUser(options);
    }

    getUserById(userId:number): Promise<UserModel | null> {
        return this.userController.getUserById(userId);
    }


    isValid(user:UserModel|null): boolean {
        if(user == null) {return false};
        if (!user.email.match(/[a-z0-9_\-.]+@[a-z0-9_\-.]+\.[a-z]+/i))
            return false;

        if(user.name == '')
            return false;

        if(user.firstname == '')
            return false;

        if(user.password.length < 8 || user.password.length > 40)
            return false;

        return !(moment().diff(user.birthdate, 'years') < 13);
    }
}
