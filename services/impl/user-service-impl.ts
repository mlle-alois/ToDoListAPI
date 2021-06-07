import {userService} from "../user-service";
import moment from "moment";
import {UserModel} from "../../models";

export class UserServiceImpl implements userService{
    isValid(user:UserModel): boolean {
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

