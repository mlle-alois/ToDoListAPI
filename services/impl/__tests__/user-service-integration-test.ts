import {ItemModel} from "../../../models";
import {UserServiceImpl} from "../user-service-impl";
import {DatabaseUtils} from "../../../database/database-tests";
import request from 'supertest';
import {app} from "../../../index";
import {Express} from "express";

let server: Express = app;
describe('Test routes user', () => {

    describe('Test route /isValid', () => {

        it('Request get should return true with 200 response!', async () => {
            const result = await request(server).get('/user/isValid/1').send();

            expect(result.status).toBe(200);
            expect(result.text).toBe("true");
        });
        it('Request get on a -13 years old user should return false with 201 response!', async () => {
            const result = await request(server).get('/user/isValid/4').send();

            expect(result.status).toBe(200);
            expect(result.text).toBe("false");
        });
        it('Request get on an invalid email should return false with 201 response!', async () => {
            const result = await request(server).get('/user/isValid/5').send();

            expect(result.status).toBe(200);
            expect(result.text).toBe("false");
        });
        it('Request get on an empty name should return false with 201 response!', async () => {
            const result = await request(server).get('/user/isValid/7').send();

            expect(result.status).toBe(200);
            expect(result.text).toBe("false");
        });
        it('Request get on an empty firstname should return false with 201 response!', async () => {
            const result = await request(server).get('/user/isValid/8').send();

            expect(result.status).toBe(200);
            expect(result.text).toBe("false");
        });
        it('Request get on a 13 years old user should return true with 201 response!', async () => {
            const result = await request(server).get('/user/isValid/9').send();

            expect(result.status).toBe(200);
            expect(result.text).toBe("true");
        });
        it('Request get on 12 years old 364 days user should return false with 201 response!', async () => {
            const result = await request(server).get('/user/isValid/10').send();

            expect(result.status).toBe(200);
            expect(result.text).toBe("false");
        });
        it('Request get without id should return undefined with 404 response!', async () => {
            const result = await request(server).get('/user/isValid').send();

            expect(result.status).toBe(404);
        });
        it('Request get  with wrong should return undefined with 404 response!', async () => {
            const result = await request(server).get('/user/isValid/999999').send();

            expect(result.status).toBe(404);
            expect(result.text).toBe("L'utilisateur renseigné est inconnu.");
        }, 30000);
    });
});
