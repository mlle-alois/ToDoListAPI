import { UserModel } from "../models";
import { Connection, RowDataPacket } from "mysql2/promise";

export class UserController {
    private connection: Connection;

    constructor(connection: Connection) {
        this.connection = connection;
    }

    async getUserById(userId: number): Promise<UserModel | null> {
        const res = await this.connection.query(`SELECT id,
                                                        name,
                                                        firstname,
                                                        email,
                                                        password,
                                                        birthdate
                                                 FROM utilisateur
                                                 where id = ?`, [
            userId
        ]);
        const data = res[0];
        if (Array.isArray(data)) {
            const rows = data as RowDataPacket[];
            if (rows.length > 0) {
                const row = rows[0];
                return new UserModel({
                    id: row["id"],
                    name: row["name"],
                    firstname: row["firstname"],
                    email: row["email"],
                    password: row["password"],
                    birthdate: row["birthdate"]
                });
            }
        }
        return null;
    }

    async createUser(options: UserModel): Promise<UserModel | null> {
        try {
            await this.connection.execute(`INSERT INTO utilisateur (
                                                                 name,
                                                                 firstname,
                                                                 email,
                                                                 password,
                                                                 birthdate
                                                                 )
                                           VALUES (?, ?, ?, ?, ?)`, [
                options.name,
                options.firstname,
                options.email,
                options.password,
                options.birthdate
            ]);

            return options;
        } catch (err) {
            return null;
        }
    }
}