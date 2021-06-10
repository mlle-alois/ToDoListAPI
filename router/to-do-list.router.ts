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

    const id = await toDoListService.getMaxCarpoolId() + 1;
    const street = req.body.street;
    const zipcode = req.body.zipcode;
    const city = req.body.city;
    const nbPlaces = req.body.nbPlaces;
    const eventId = req.body.eventId;

    if (street === undefined || zipcode === undefined || city === undefined ||
        nbPlaces === undefined || eventId === undefined) {
        res.status(400).end("Veuillez renseigner les informations nécessaires");
        return;
    }

    const conductorId = await getUserMailConnected(req);
    if (conductorId instanceof LogError)
        return LogError.HandleStatus(res, conductorId);

    const carpool = await toDoListService.createCarpool({
        carpoolId: id,
        carpoolDepartureStreet: street,
        carpoolDepartureZipcode: zipcode,
        carpoolDepartureCity: city,
        nbPlaces: nbPlaces,
        eventId: eventId,
        conductorId: conductorId
    });

    if (carpool instanceof LogError) {
        LogError.HandleStatus(res, carpool);
    } else {
        res.status(201);
        res.json(carpool);
    }
});

/**
 * /toDoList/updateToDoListByEmail/:email
 */
toDoListRouter.put("/updateToDoListByEmail/:email", async function (req, res) {

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