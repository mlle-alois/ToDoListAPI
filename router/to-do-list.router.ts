import express from "express";
import {DatabaseUtils} from "../database/database-local";
import {ToDoListServiceImpl} from "../services/impl/to-do-list-service-impl";

const toDoListRouter = express.Router();

/**
 * /toDoList/addItemByToDoListId/:id
 */
toDoListRouter.post("/addItemByToDoListId/:id", async function (req, res) {
    const connection = await DatabaseUtils.getConnection();
    const toDoListService = new ToDoListServiceImpl(connection);

    const name = req.body.name;
    const content = req.body.content;
    const todolist = parseInt(req.params.id);

    if (name === undefined || content === undefined || todolist === undefined) {
        res.status(400).end("Veuillez renseigner les informations nécessaires");
        return;
    }

    const success = await toDoListService.add({
        id: 0,
        name: name,
        content: content,
        dateHourAdd: new Date(),
        toDoList: todolist
    });
    console.log(success)

    if (!success) {
        res.status(500).end("La création n'a pas pu aboutir, veillez à renseigner des informations valides");
    } else {
        res.status(201).end();
    }
});

/**
 * /toDoList/updateToDoListById/:id
 */
toDoListRouter.put("/updateToDoListById/:id", async function (req, res) {
    const id = req.params.id;
    const name = req.body.name;
    const description = req.body.description;
    const utilisateur = req.body.utilisateur;

    if (id === undefined || (name === undefined && description === undefined && utilisateur === undefined)|| (utilisateur === undefined)) {
        res.status(400).end("Veuillez renseigner les informations nécessaires");
        return;
    }
    const connection = await DatabaseUtils.getConnection();
    const toDoListService = new ToDoListServiceImpl(connection);

    const toDoList = await toDoListService.updateToDoList({
        id: Number.parseInt(id),
        name: name,
        description: description,
        utilisateur: utilisateur
    });

    if (toDoList === null)
        res.status(500).end("La modification n'a pas pu aboutir, veillez à renseigner des informations valides");
    else
        res.json(toDoList);
});

/**
 * /toDoList/timeIsOverForTodoList/:id
 */
toDoListRouter.get("/timeIsOverForTodoList/:id", async function (req, res) {
    const connection = await DatabaseUtils.getConnection();
    const toDoListService = new ToDoListServiceImpl(connection);

    const id = req.params.id;

    if (id === undefined)
        return res.status(400).end("Veuillez renseigner les informations nécessaires");

    const waitingTimeIsOver = await toDoListService.waitingTimeIsOver(Number.parseInt(id));

    if(waitingTimeIsOver !== null)
        res.status(201).end(waitingTimeIsOver + "");
    else
        res.status(404).end();
});

/**
 * /toDoList/nameAlreadyExistInToDoList/:id?name={x}
 */
toDoListRouter.get("/nameAlreadyExistInToDoList/:id", async function (req, res) {
    const connection = await DatabaseUtils.getConnection();
    const toDoListService = new ToDoListServiceImpl(connection);

    const id = req.params.id;
    const name = req.query.name as string;

    if (id === undefined || name === undefined)
        return res.status(400).end("Veuillez renseigner les informations nécessaires");

    const nameAlreadyExist = await toDoListService.nameAlreadyExist(name, Number.parseInt(id));

    if(nameAlreadyExist !== null)
        res.status(201).end(nameAlreadyExist + "");
    else
        res.status(401);
});

export {
    toDoListRouter
}