import {ItemModel, ToDoListModel} from "../../../models";
import {ToDoListServiceImpl} from "../to-do-list-service-impl";

describe('ToDoListService test', () => {
    const toDoListService = new ToDoListServiceImpl();
    describe('Test add function', () => {
        it('Should return false with full list', () => {
            const todoList = new ToDoListModel();
            const item = new ItemModel({
                name: "Devoirs",
                content: ""
            });
            for (let i = 0; i < 10; i += 1) {
                todoList.list.push({
                    name: "Item 1",
                    content: "Tu dois faire ça",
                    dateHourAdd: new Date(2000, 8, 14)
                });
            }
            expect(toDoListService.add(item, todoList)).toEqual(false);
        });
        it('Should return false when not wait enough', () => {
            const todoList = new ToDoListModel();
            const item = new ItemModel({
                name: "Devoirs",
                content: ""
            });
            todoList.list.push({
                name: "Item 1",
                content: "Tu dois faire ça",
                dateHourAdd: new Date()
            });
            expect(toDoListService.add(item, todoList)).toEqual(false);
        });
        it('Should return false with name already exist', () => {
            const todoList = new ToDoListModel();
            const item = new ItemModel({
                name: "Item 1",
                content: "Tu dois faire ça"
            });
            todoList.list.push({
                name: "Item 1",
                content: "Tu dois faire ça",
                dateHourAdd: new Date(2000, 8, 14)
            });
            expect(toDoListService.add(item, todoList)).toEqual(false);
        });
        it('Should return false with name is empty', () => {
            const todoList = new ToDoListModel();
            const item = new ItemModel({
                name: "",
                content: "Tu dois faire ça"
            });
            expect(toDoListService.add(item, todoList)).toEqual(false);
        });
        it('Should return false with content is empty', () => {
            const todoList = new ToDoListModel();
            const item = new ItemModel({
                name: "Item 1",
                content: ""
            });
            expect(toDoListService.add(item, todoList)).toEqual(false);
        });
        it('Should return false with length content over 1000', () => {

            const todoList = new ToDoListModel();
            const item = new ItemModel({
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
                    "comes montium ad"
            });
            todoList.list.push({
                name: "Item 1",
                content: "Tu dois faire ça",
                dateHourAdd: new Date(2000, 8, 14)
            });
            expect(toDoListService.add(item, todoList)).toEqual(false);
        });
        it('Should return true with empty list', () => {
            const todoList = new ToDoListModel();
            const item = new ItemModel({
                name: "Devoirs",
                content: ""
            });
            expect(toDoListService.add(item, todoList)).toEqual(false);
        });
        it('Should return true with not empty list', () => {
            const todoList = new ToDoListModel();
            const item = new ItemModel({
                name: "Devoirs",
                content: ""
            });
            todoList.list.push({
                name: "Item 1",
                content: "Tu dois faire ça",
                dateHourAdd: new Date(2000, 8, 14)
            });
            expect(toDoListService.add(item, todoList)).toEqual(false);
        });
    });

    describe('Test waitingTimeIsOver function', () => {
        it('Should return true with empty list', () => {
            const todoList = new ToDoListModel();
            expect(toDoListService.waitingTimeIsOver(todoList)).toEqual(true);
        });
        it('Should return true with not empty list but wait enough', () => {
            const todoList = new ToDoListModel();
            todoList.list.push({
                name: "Item 1",
                content: "Tu dois faire ça",
                dateHourAdd: new Date(2000, 8, 14)
            });
            expect(toDoListService.waitingTimeIsOver(todoList)).toEqual(true);
        });
        it('Should return false with not empty list but not wait enough', () => {
            const todoList = new ToDoListModel();
            todoList.list.push({
                name: "Item 1",
                content: "Tu dois faire ça",
                dateHourAdd: new Date()
            });
            expect(toDoListService.waitingTimeIsOver(todoList)).toEqual(false);
        });
    });

    describe('Test nameAlreadyExist function', () => {
        it('Should return false with empty list', () => {
            const todoList = new ToDoListModel();
            const item = new ItemModel({
                name: "Item 1",
                content: "Tu dois faire ça"
            });
            expect(toDoListService.nameAlreadyExist(item, todoList)).toEqual(false);
        });
        it('Should return true with list with an item with same name', () => {
            const todoList = new ToDoListModel();
            const item = new ItemModel({
                name: "Item 1",
                content: "Tu dois faire ça"
            });
            todoList.list.push({
                name: "Item 1",
                content: "Tu dois faire ça",
                dateHourAdd: new Date(2000, 8, 14)
            });
            expect(toDoListService.nameAlreadyExist(item, todoList)).toEqual(true);
        });
        it('Should return false with list with not an item with same name', () => {
            const todoList = new ToDoListModel();
            const item = new ItemModel({
                name: "Item 1",
                content: "Tu dois faire ça"
            });
            todoList.list.push({
                name: "Je suis un item",
                content: "Tu dois faire ça",
                dateHourAdd: new Date(2000, 8, 14)
            });
            expect(toDoListService.nameAlreadyExist(item, todoList)).toEqual(false);
        })
    });
})