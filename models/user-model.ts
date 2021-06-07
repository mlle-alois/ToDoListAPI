import {ToDoListModel} from "./to-do-list-model";

interface UserModelProps {
    name: string;
    firstname: string;
    email: string;
    password: string;
    birthdate: Date;
    toDoList: ToDoListModel;
}

export class UserModel implements UserModelProps {
    birthdate: Date;
    email: string;
    firstname: string;
    name: string;
    password: string;
    toDoList: ToDoListModel;

    constructor(properties: UserModelProps) {
        this.birthdate = properties.birthdate;
        this.email = properties.email;
        this.firstname = properties.firstname;
        this.name = properties.name;
        this.password = properties.password;
        this.toDoList = properties.toDoList;
    }


}