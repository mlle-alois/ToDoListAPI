import {ItemModel, ToDoListModel} from "../models";
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
                                                 FROM todolist
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

    async getToDoListByMaxId(): Promise<ToDoListModel | null> {
        const res = await this.connection.query(`SELECT id,
                                                        name,
                                                        description,
                                                        utilisateur
                                                 FROM todolist
                                                 where id = MAX(id)`);
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

    async getItemByMaxId(): Promise<ItemModel | null> {
        const res = await this.connection.query(`SELECT id,
                                                        name,
                                                        content,
                                                        dateHourAdd,
                                                        todolist
                                                 FROM item
                                                 where id = (select MAX(id)
                                                             FROM item)`);
        const data = res[0];
        if (Array.isArray(data)) {
            const rows = data as RowDataPacket[];
            if (rows.length > 0) {
                const row = rows[0];
                return new ItemModel({
                    id: row["id"],
                    name: row["name"],
                    content: row["content"],
                    dateHourAdd: row["dateHourAdd"],
                    toDoList: row["todolist"]
                });
            }
        }
        return null;
    }

    async getToDoListItemsById(toDoListId: number): Promise<ItemModel[] | null> {
        const res = await this.connection.query(`SELECT I.id,
                                                        I.name,
                                                        I.content,
                                                        I.dateHourAdd,
                                                        I.todolist
                                                 FROM todolist T
                                                          JOIN todolist_contains_item TCI ON T.id = TCI.todolist_id
                                                          JOIN item I ON I.id = TCI.item_id
                                                 where T.id = ?`, [
            toDoListId
        ]);
        const data = res[0];
        if (Array.isArray(data)) {
            const rows = data as RowDataPacket[];
            if (rows.length > 0) {
                const row = rows[0];
                return (data as RowDataPacket[]).map(function (row: any) {
                    return new ItemModel({
                        id: row["id"],
                        name: row["name"],
                        content: row["content"],
                        dateHourAdd: row["dateHourAdd"],
                        toDoList: row["todolist"]
                    });
                });
            }
        }
        return null;
    }

    async createToDoList(options: ToDoListModel): Promise<ToDoListModel | null> {
        try {
            await this.connection.execute(`INSERT INTO todolist (name,
                                                                 description,
                                                                 utilisateur)
                                           VALUES (?, ?, ?)`, [
                options.name,
                options.description,
                options.utilisateur
            ]);

            return await this.getToDoListByMaxId();
        } catch (err) {
            return null;
        }
    }

    async createItem(options: ItemModel): Promise<ItemModel | null> {
        try {
            await this.connection.execute(`INSERT INTO item (name,
                                                             content,
                                                             dateHourAdd,
                                                             todolist)
                                           VALUES (?, ?, ?, ?)`, [
                options.name,
                options.content,
                options.dateHourAdd,
                options.toDoList
            ]);
            return await this.getItemByMaxId();
        } catch (err) {
            return null;
        }
    }

    async addItemToToDoList(itemId: number, toDoListId: number): Promise<boolean> {
        try {
            await this.connection.execute(`INSERT INTO todolist_contains_item (todolist_id, item_id)
                                           VALUES (?, ?)`, [
                toDoListId, itemId
            ]);
            return true;
        } catch (err) {
            return false;
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
            const res = await this.connection.execute(`UPDATE todolist SET ${setClause.join(", ")} WHERE id = ?`, params);
            const headers = res[0] as ResultSetHeader;
            if (headers.affectedRows > 0) {
                return await this.getToDoListById(options.id);
            }
            return null;
        } catch (err) {
            return null;
        }
    }

    /*async registerToDoList(toDoListId: number, userMail: string): Promise<UserModel[] | LogError> {
        try {
            await this.connection.execute(`INSERT INTO RESERVE_USER_todolist (user_id, toDoList_id)
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
                                           FROM RESERVE_USER_todolist
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
        const res = await this.connection.query(`SELECT todolist.toDoList_id,
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
                                                 FROM todolist
                                                          JOIN USER ON USER.user_mail = todolist.conductor_id
                                                          LEFT JOIN RESERVE_USER_todolist RUC ON RUC.toDoList_id = todolist.toDoList_id
                                                 WHERE todolist.event_id = ?
                                                 GROUP BY todolist.toDoList_id`, [
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
                                                          JOIN RESERVE_USER_todolist RUC ON RUC.user_id = USER.user_mail
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