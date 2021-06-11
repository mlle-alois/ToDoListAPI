import {ToDoListService} from "../to-do-list-service";
import {ItemModel, ToDoListModel} from "../../models";
import moment from "moment";
import {EmailSenderServiceImpl} from "./email-sender-service-impl";
import {UserServiceImpl} from "./user-service-impl";
import {ToDoListController} from "../../controllers/to-do-list.controller";
import {Connection} from "mysql2/promise";

export class ToDoListServiceImpl implements ToDoListService {

    connection: Connection;
    toDoListController: ToDoListController;
    emailSenderService: EmailSenderServiceImpl;
    userService: UserServiceImpl;

    constructor(connection: Connection) {
        this.connection = connection;
        this.toDoListController = new ToDoListController(this.connection);
        this.emailSenderService = new EmailSenderServiceImpl();
        this.userService = new UserServiceImpl(connection);
    }

    async createToDoList(options: ToDoListModel): Promise<ToDoListModel | null> {
        const user = await this.userService.getUserById(options.utilisateur);
        if (user === null)
            return null;

        return this.toDoListController.createToDoList(options);
    }

    async updateToDoList(options: ToDoListModel): Promise<ToDoListModel | null> {
        const user = await this.userService.getUserById(options.utilisateur);
        if (user === null)
            return null;
        return await this.toDoListController.updateToDoList(options);
    }

    async add(item: ItemModel): Promise<boolean> {
        const toDoList = await this.toDoListController.getToDoListById(item.toDoList);
        if (toDoList === null) {
            return false;
        }
        const list = await this.toDoListController.getToDoListItemsById(item.toDoList);
        if (list === null)
            toDoList.list = [];
        else
            toDoList.list = list;
        if (toDoList.list.length >= 10 || !(await this.waitingTimeIsOver(item.toDoList)) ||
            (item.name === "" || item.content === "") || await this.nameAlreadyExist(item.name, item.toDoList) ||
            item.content.length > 1000) {
            return false;
        }

        const resultCreateItem = await this.toDoListController.createItem(item);
        if (resultCreateItem === null) {
            return false;
        }
        const resultAddItem = await this.toDoListController.addItemToToDoList(resultCreateItem.id, item.toDoList);
        if (!resultAddItem) {
            return false;
        }
        toDoList.list.push(item);

        if (toDoList.list.length == 8)
            this.emailSenderService.sendMailFor2RemainingItems();

        return true;
    }

    async waitingTimeIsOver(toDoListId: number): Promise<boolean | null> {
        const toDoList = await this.toDoListController.getToDoListById(toDoListId);
        if (toDoList === null) {
            return null;
        }
        const list = await this.toDoListController.getToDoListItemsById(toDoListId);
        if (list === null)
            toDoList.list = [];
        else
            toDoList.list = list;
        return !(toDoList.list.length > 0 && moment().diff(toDoList.list[toDoList.list.length - 1].dateHourAdd, 'minutes') < 30);
    }

    async nameAlreadyExist(itemName: string, toDoListId: number): Promise<boolean | null> {
        const toDoList = await this.toDoListController.getToDoListById(toDoListId);
        if (toDoList === null) {
            return null;
        }
        const list = await this.toDoListController.getToDoListItemsById(toDoListId);
        if (list === null)
            toDoList.list = [];
        else
            toDoList.list = list;
        const nameAlreadyExist = toDoList.list.find(element => element.name === itemName);
        return nameAlreadyExist !== undefined;
    }

}