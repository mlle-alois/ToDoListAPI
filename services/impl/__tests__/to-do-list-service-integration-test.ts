import {ItemModel} from "../../../models";
import {ToDoListServiceImpl} from "../to-do-list-service-impl";
import {DatabaseUtils} from "../../../database/database-tests";
import request from 'supertest';
import {app} from "../../../index";
import {Express} from "express";

let server: Express = app;
describe('Test routes toDoList', () => {
    describe('Test route /timeIsOverForTodoList', () => {

        it('Request get  should return undefined with 201 response!', async () => {
            const result = await request(server).get('/toDoList/timeIsOverForTodoList/3').send();

            expect(result.status).toBe(201);
            expect(result.text).toBe("true");
        });
        it('Request get  without id should return undefined with 404 response!', async () => {
            const result = await request(server).get('/toDoList/timeIsOverForTodoList').send();

            expect(result.status).toBe(404);
        });
        it('Request get  with wrong should return undefined with 404 response!', async () => {
            const result = await request(server).get('/toDoList/timeIsOverForTodoList/999999').send();

            expect(result.status).toBe(404);
            expect(result.text).toBe("");
        }, 30000);
    });

    describe('Test route /updateToDoListById/', () => {

        it('Request put should return 404 response!', async () => {
            const result = await request(server).put('/toDoList/updateToDoListById').send();

            expect(result.status).toBe(404);
        });
        it('Request put with only description should return 400 response!', async () => {
            const result = await request(server).put('/toDoList/updateToDoListById/1').send({description: "woooo"});

            expect(result.status).toBe(400);
            expect(result.text).toBe("Veuillez renseigner les informations nécessaires");
        });
        it('Request put with only name should return 400 response!', async () => {
            const result = await request(server).put('/toDoList/updateToDoListById/1').send({name: "zizou"});

            expect(result.status).toBe(400);
            expect(result.text).toBe("Veuillez renseigner les informations nécessaires");
        });
        it('Request put with wrong utilisateur should return 400 response!', async () => {
            const result = await request(server).put('/toDoList/updateToDoListById/1').send({utilisateur: "zizou"});

            expect(result.status).toBe(500);
            expect(result.text).toBe("La modification n'a pas pu aboutir, veillez à renseigner des informations valides");

        });
        it('Valid put with utilisateur & description should return 200 response!', async () => {
            const result = await request(server).put('/toDoList/updateToDoListById/1').send({
                description: "yoo2",
                utilisateur: "10"
            });

            expect(result.status).toBe(200);
            expect(result.body.description).toBe("yoo2");
            expect(result.body.utilisateur).toBe(10);
        });
        it('Valid put with all parameters should return 200 response!', async () => {
            const result = await request(server).put('/toDoList/updateToDoListById/1').send({
                name: "woo",
                description: "yoo3",
                utilisateur: "10"
            });

            expect(result.status).toBe(200);
            expect(result.body.name).toBe("woo");
            expect(result.body.description).toBe("yoo3");
            expect(result.body.utilisateur).toBe(10);
        });
    });

    describe('Test route /nameAlreadyExistInToDoList', () => {

        it('Request get  without id should return undefined with 404 response!', async () => {
            const result = await request(server).get('/toDoList/nameAlreadyExistInToDoList').send();

            expect(result.status).toBe(404);
        });
        it('Request get with only id should return error message with 400 response!', async () => {
            const result = await request(server).get('/toDoList/nameAlreadyExistInToDoList/1').send();

            expect(result.status).toBe(400);
            expect(result.text).toBe("Veuillez renseigner les informations nécessaires");
        });
        it('Request get with only name should return error message with 400 response!', async () => {
            const result = await request(server).get('/toDoList/nameAlreadyExistInToDoList/name=oui').send();

            expect(result.status).toBe(400);
            expect(result.text).toBe("Veuillez renseigner les informations nécessaires");
        });
        it('Request get with valid id but name not existing in list should return false with 201 response!', async () => {
            const result = await request(server).get('/toDoList/nameAlreadyExistInToDoList/1?name=ZIZOU').send();

            expect(result.status).toBe(201);
            expect(result.text).toBe("false");
        });
        it('Request get with valid id but name exiting should return false with 201 response!', async () => {
            const result = await request(server).get('/toDoList/nameAlreadyExistInToDoList/2?name=Devoirs').send();

            expect(result.status).toBe(201);
            expect(result.text).toBe("true");
        });
    });
});