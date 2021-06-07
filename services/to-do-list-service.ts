import {ItemModel, ToDoListModel} from "../models";

export interface ToDoListService {
    add(item: ItemModel, toDoList: ToDoListModel): boolean;

    waitingTimeIsOver(toDoList: ToDoListModel): boolean;

    nameAlreadyExist(item: ItemModel, toDoList: ToDoListModel): boolean;
}