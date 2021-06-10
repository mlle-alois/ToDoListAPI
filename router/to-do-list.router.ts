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
    const dateHourAdd = req.body.dateHourAdd;
    const todolist = req.body.todolist;

    if (name === undefined || content === undefined || dateHourAdd === undefined || todolist === undefined) {
        res.status(400).end("Veuillez renseigner les informations nécessaires");
        return;
    }

    const toDoList = await toDoListService.createItem({
        id: 0,
        name: name,
        content: content,
        dateHourAdd: dateHourAdd,
        toDoList: todolist
    });

    if (toDoList === null) {
        res.status(500).end("La création n'a pas pu aboutir, veillez à renseigner des informations valides");
    } else {
        res.status(201);
        res.json(toDoList);
    }
});

/**
 * /toDoList/updateToDoListById/:id
 */
toDoListRouter.put("/updateToDoListByEmail/:id", async function (req, res) {
    const id = req.params.id;
    const name = req.body.name;
    const description = req.body.description;
    const utilisateur = req.body.utilisateur;

    if (id === undefined || (name === undefined && description === undefined && utilisateur === undefined)) {
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

    if (waitingTimeIsOver)
        res.status(204).end();
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

    if (nameAlreadyExist)
        res.status(204).end();
    else
        res.status(404).end();
});

export {
    toDoListRouter
}