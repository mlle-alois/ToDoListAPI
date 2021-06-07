import {ToDoListService} from "../to-do-list-service";
import {ItemModel, ToDoListModel} from "../../models";
import moment from "moment";
import {EmailSenderServiceImpl} from "./email-sender-service-impl";

export class ToDoListServiceImpl implements ToDoListService {

    emailSenderService: EmailSenderServiceImpl;

    constructor() {
        this.emailSenderService = new EmailSenderServiceImpl();
    }

    add(item: ItemModel, toDoList: ToDoListModel): boolean {
        if(toDoList.list.length >= 10 || !this.waitingTimeIsOver(toDoList) ||
            (item.name === "" || item.content === "") || this.nameAlreadyExist(item, toDoList) ||
            item.content.length > 1000)
            return false;

        item.dateHourAdd = new Date();
        toDoList.list.push(item);

        if(toDoList.list.length == 8)
            this.emailSenderService.sendMailFor2RemainingItems();

        return true;
    }

    waitingTimeIsOver(toDoList: ToDoListModel): boolean {
        return !(toDoList.list.length > 0 && moment().diff(toDoList.list[toDoList.list.length - 1].dateHourAdd, 'minutes') < 30);
    }

    nameAlreadyExist(item: ItemModel, toDoList: ToDoListModel): boolean {
        const nameAlreadyExist = toDoList.list.find(element => element.name === item.name);
        return nameAlreadyExist !== undefined;
    }

}