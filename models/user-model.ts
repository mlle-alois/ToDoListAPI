import {ToDoListModel} from "./to-do-list-model";

interface UserModelProps {
    id: number;
    name: string;
    firstname: string;
    email: string;
    password: string;
    birthdate: Date;
}

export class UserModel implements UserModelProps {
    id: number;
    birthdate: Date;
    email: string;
    firstname: string;
    name: string;
    password: string;

    constructor(properties: UserModelProps) {
        this.id = properties.id;
        this.birthdate = properties.birthdate;
        this.email = properties.email;
        this.firstname = properties.firstname;
        this.name = properties.name;
        this.password = properties.password;
    }
}