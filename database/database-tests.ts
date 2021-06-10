import {Connection, createConnection} from 'mysql2/promise';

export class DatabaseUtils {

    private static connection?: Connection;

    static async getConnection(): Promise<Connection> {
        if(!DatabaseUtils.connection) {
            DatabaseUtils.connection = await createConnection({
                host: 'mysql-chtitski.alwaysdata.net',
                user: 'chtitski',
                password: '(toDoList)', 
                database: "chtitski_todolist",
                port: 3306 
            });
        }
        return DatabaseUtils.connection;
    }
}