import {ItemModel, ToDoListModel} from "../../../models";
import {ToDoListServiceImpl} from "../to-do-list-service-impl";
import {DatabaseUtils} from "../../../database/database-tests";

describe('ToDoListService test', () => {
    describe('Test add function', () => {
        it('Should return false with full list', async () => {
            const connection = await DatabaseUtils.getConnection();
            const toDoListService = new ToDoListServiceImpl(connection);
            const item = new ItemModel({
                id: 0,
                name: "Devoirs",
                content: "yop",
                dateHourAdd: new Date(),
                toDoList: 1
            });
            expect(await toDoListService.add(item)).toEqual(false);
        });
        it('Should return false with name already exist', async () => {
            const connection = await DatabaseUtils.getConnection();
            const toDoListService = new ToDoListServiceImpl(connection);
            const item = new ItemModel({
                id: 0,
                name: "Devoirs",
                content: "yop",
                dateHourAdd: new Date(),
                toDoList: 2
            });
            expect(await toDoListService.add(item)).toEqual(false);
        });
        it('Should return false with name is empty', async () => {
            const connection = await DatabaseUtils.getConnection();
            const toDoListService = new ToDoListServiceImpl(connection);
            const item = new ItemModel({
                id: 0,
                name: "",
                content: "Tu dois faire ça",
                dateHourAdd: new Date(),
                toDoList: 2
            });
            expect(await toDoListService.add(item)).toEqual(false);
        });
        it('Should return false with content is empty', async () => {
            const connection = await DatabaseUtils.getConnection();
            const toDoListService = new ToDoListServiceImpl(connection);
            const item = new ItemModel({
                id: 0,
                name: "Devoirs",
                content: "",
                dateHourAdd: new Date(),
                toDoList: 2
            });
            expect(await toDoListService.add(item)).toEqual(false);
        });
        it('Should return false with length content over 1000', async () => {
            const connection = await DatabaseUtils.getConnection();
            const toDoListService = new ToDoListServiceImpl(connection);
            const item = new ItemModel({
                id: 0,
                name: "Devoirs",
                content: "Re ea studio et ea magister amplam latius studio amplius copiis et eximendam Caesarem comes " +
                    "amplam fama longius iussus periculo ut properabat oportunam avia ingenti eximendam longius Gallum et " +
                    "ingenti Caesarem Nebridius militaribus ut et gesta copiis Gallum montium distinebatur quoniam quo ut " +
                    "celsorum latius abscessere ubi ea Nebridius latrones contractis montium amplius re properabat longius " +
                    "ut ea orientis studio fama ut militaribus amplius latius gesta petiere abscessere magister missaeque " +
                    "missaeque petiere fama amplam re equitum amplam missaeque ut dispersique relationes iussus copiis " +
                    "Gallum amplam contractis comes montium adsiduae solent iussus solent nulla missaeque equitum vulgasset " +
                    "ea undique equitum Gallum.dius latrones contractis montium amplius re properabat longius ut ea orientis " +
                    "studio fama ut militaribus amplius latius gesta petiere abscessere magister missaeque missaeque petiere " +
                    "fama amplam re equitum amplam missaeque ut dispersique relationes iussus copiis Gallum amplam contractis " +
                    "comes montium ad",
                dateHourAdd: new Date(),
                toDoList: 2
            });
            expect(await toDoListService.add(item)).toEqual(false);
        });
    });

    describe('Test waitingTimeIsOver function', () => {
        it('Should return true with empty list', async () => {
            const connection = await DatabaseUtils.getConnection();
            const toDoListService = new ToDoListServiceImpl(connection);
            expect(await toDoListService.waitingTimeIsOver(3)).toEqual(true);
        });
        /*it('Should return true with not empty list but wait enough', () => {
            const todoList = new ToDoListModel();
            todoList.list.push({
                name: "Item 1",
                content: "Tu dois faire ça",
                dateHourAdd: new Date(2000, 8, 14)
            });
            expect(toDoListService.waitingTimeIsOver(todoList)).toEqual(true);
        });
        it('Should return false with not empty list but not wait enough', async () => {
            const todoList = new ToDoListModel();
            todoList.list.push({
                name: "Item 1",
                content: "Tu dois faire ça",
                dateHourAdd: new Date()
            });
            expect(toDoListService.waitingTimeIsOver(todoList)).toEqual(false);
        });*/
    });

    describe('Test nameAlreadyExist function', () => {
        it('Should return false with empty list', async () => {
            const connection = await DatabaseUtils.getConnection();
            const toDoListService = new ToDoListServiceImpl(connection);
            const item = new ItemModel({
                id: 0,
                name: "Devoirs",
                content: "yop",
                dateHourAdd: new Date(),
                toDoList: 3
            });
            expect(await toDoListService.nameAlreadyExist(item.name, item.toDoList)).toEqual(false);
        });
        it('Should return true with list with an item with same name', async () => {
            const connection = await DatabaseUtils.getConnection();
            const toDoListService = new ToDoListServiceImpl(connection);
            const item = new ItemModel({
                id: 0,
                name: "Devoirs",
                content: "yop",
                dateHourAdd: new Date(),
                toDoList: 2
            });
            expect(await toDoListService.nameAlreadyExist(item.name, item.toDoList)).toEqual(true);
        });
        it('Should return false with list with not an item with same name', async () => {
            const connection = await DatabaseUtils.getConnection();
            const toDoListService = new ToDoListServiceImpl(connection);
            const item = new ItemModel({
                id: 0,
                name: "Mes devoirs",
                content: "yop",
                dateHourAdd: new Date(),
                toDoList: 2
            });
            expect(await toDoListService.nameAlreadyExist(item.name, item.toDoList)).toEqual(false);
        })
    });
});