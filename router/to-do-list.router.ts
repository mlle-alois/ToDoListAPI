import express from "express";
import {DatabaseUtils} from "../database/database-local";

const toDoListRouter = express.Router();

/**
 * /toDoList/addItemByToDoListId/:id
 */
toDoListRouter.post("/addItemByToDoListId/:id", async function (req, res) {

});

/**
 * /toDoList/updateToDoListByEmail/:email
 */
toDoListRouter.put("/updateToDoListByEmail/:email", async function (req, res){

});

/**
 * /toDoList/timeIsOverForTodoList/:id
 */
toDoListRouter.get("/timeIsOverForTodoList/:id", async function (req, res) {
    console.log('oui')
    const connection = await DatabaseUtils.getConnection();
    console.log(connection)
    res.json("")
});

/**
 * /toDoList/nameAlreadyExistInToDoList/:id/name={x}
 */
toDoListRouter.get("/nameAlreadyExistInToDoList/:id", async function (req, res) {

});

export {
    toDoListRouter
}