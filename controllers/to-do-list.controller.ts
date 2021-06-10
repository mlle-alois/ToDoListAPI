import {ToDoListModel} from "../models";
import {Connection, ResultSetHeader, RowDataPacket} from "mysql2/promise";

export class ToDoListController {

    private connection: Connection;

    constructor(connection: Connection) {
        this.connection = connection;
    }

    async getToDoListById(toDoListId: number): Promise<ToDoListModel | null> {
        const res = await this.connection.query(`SELECT id,
                                                        name,
                                                        description,
                                                        utilisateur
                                                 FROM TODOLIST
                                                 where id = ?`, [
            toDoListId
        ]);
        const data = res[0];
        if (Array.isArray(data)) {
            const rows = data as RowDataPacket[];
            if (rows.length > 0) {
                const row = rows[0];
                return new ToDoListModel({
                    id: row["id"],
                    name: row["name"],
                    description: row["description"],
                    utilisateur: row["utilisateur"]
                });
            }
        }
        return null;
    }

    async createToDoList(options: ToDoListModel): Promise<ToDoListModel | null> {
        try {
            await this.connection.execute(`INSERT INTO TODOLIST (id,
                                                                 name,
                                                                 description,
                                                                 utilisateur)
                                           VALUES (?, ?, ?, ?)`, [
                options.id,
                options.name,
                options.description,
                options.utilisateur
            ]);

            return await this.getToDoListById(options.id);
        } catch (err) {
            return null;
        }
    }

    async updateToDoList(options: ToDoListModel): Promise<ToDoListModel | null> {
        const setClause: string[] = [];
        const params = [];

        if (options.name !== undefined) {
            setClause.push("name = ?");
            params.push(options.name);
        }
        if (options.description !== undefined) {
            setClause.push("description = ?");
            params.push(options.description);
        }
        if (options.utilisateur !== undefined) {
            setClause.push("utilisateur = ?");
            params.push(options.utilisateur);
        }
        params.push(options.id);
        try {
            const res = await this.connection.execute(`UPDATE TODOLIST SET ${setClause.join(", ")} WHERE id = ?`, params);
            const headers = res[0] as ResultSetHeader;
            if (headers.affectedRows > 0) {
                return this.getToDoListById(options.id);
            }
            return null;
        } catch (err) {
            return null;
        }
    }

    /*async registerToDoList(toDoListId: number, userMail: string): Promise<UserModel[] | LogError> {
        try {
            await this.connection.execute(`INSERT INTO RESERVE_USER_TODOLIST (user_id, toDoList_id)
                                           VALUES (?, ?)`, [
                userMail, toDoListId
            ]);

            return await this.getToDoListMembersById(toDoListId);
        } catch (err) {
            console.error(err);
            return new LogError({numError: 500, text: "Error during registration"});
        }
    }

    async unregisterToDoList(toDoListId: number, userMail: string): Promise<UserModel[] | LogError> {
        try {
            await this.connection.execute(`DELETE
                                           FROM RESERVE_USER_TODOLIST
                                           WHERE user_id = ?
                                             AND toDoList_id = ?`, [
                userMail, toDoListId
            ]);

            return await this.getToDoListMembersById(toDoListId);
        } catch (err) {
            console.error(err);
            return new LogError({numError: 500, text: "Error during unregistration"});
        }
    }

    async getToDoListsByEvent(eventId: number): Promise<ToDoListModel[]> {
        const res = await this.connection.query(`SELECT TODOLIST.toDoList_id,
                                                        toDoList_departure_street,
                                                        toDoList_departure_zipcode,
                                                        toDoList_departure_city,
                                                        nb_places,
                                                        COALESCE(nb_places - COUNT(RUC.toDoList_id), 0) as toDoList_remaining_places,
                                                        event_id,
                                                        conductor_id,
                                                        user_password,
                                                        user_name,
                                                        user_firstname,
                                                        user_phone_number
                                                 FROM TODOLIST
                                                          JOIN USER ON USER.user_mail = TODOLIST.conductor_id
                                                          LEFT JOIN RESERVE_USER_TODOLIST RUC ON RUC.toDoList_id = TODOLIST.toDoList_id
                                                 WHERE TODOLIST.event_id = ?
                                                 GROUP BY TODOLIST.toDoList_id`, [
            eventId
        ]);
        const data = res[0];
        if (Array.isArray(data)) {
            return (data as RowDataPacket[]).map(function (row: any) {
                return new ToDoListModel({
                    toDoListId: row["toDoList_id"],
                    toDoListDepartureStreet: row["toDoList_departure_street"],
                    toDoListDepartureZipcode: row["toDoList_departure_zipcode"],
                    toDoListDepartureCity: row["toDoList_departure_city"],
                    nbPlaces: row["nb_places"],
                    toDoListRemainingPlaces: row["toDoList_remaining_places"],
                    eventId: row["event_id"],
                    conductorId: row["conductor_id"],
                    conductor: new UserModel({
                        mail: row["conductor_id"],
                        password: row["user_password"],
                        name: row["user_name"],
                        firstname: row["user_firstname"],
                        phoneNumber: row["user_phone_number"]
                    })
                });
            });
        }
        return [];
    }

    async getToDoListMembersById(toDoListId: number): Promise<UserModel[] | LogError> {
        const res = await this.connection.query(`SELECT user_mail,
                                                        user_password,
                                                        user_name,
                                                        user_firstname,
                                                        user_phone_number,
                                                        profile_picture_id,
                                                        user_type_id
                                                 FROM USER
                                                          JOIN RESERVE_USER_TODOLIST RUC ON RUC.user_id = USER.user_mail
                                                 WHERE toDoList_id = ?`, [
            toDoListId
        ]);
        const data = res[0];
        if (Array.isArray(data)) {
            return (data as RowDataPacket[]).map(function (row: any) {
                return new UserModel({
                    mail: row["user_mail"],
                    password: row["user_password"],
                    firstname: row["user_firstname"],
                    name: row["user_name"],
                    phoneNumber: row["user_phone_number"],
                    profilePictureId: row["profile_picture_id"],
                    typeId: row["user_type_id"]
                });
            });
        }
        return [];
    }*/
}