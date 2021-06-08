import {Express} from "express";
import {toDoListRouter} from "./to-do-list.router";
import {userRouter} from "./user.router";


export function buildRoutes(app: Express) {
    app.use("/toDoList", toDoListRouter);
    app.use("/user", userRouter);
}
