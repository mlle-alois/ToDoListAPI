import {ItemModel, ToDoListModel} from "../models";

export interface ToDoListService {
    add(item: ItemModel, toDoListId: number): Promise<boolean>;

    waitingTimeIsOver(toDoListId: number): Promise<boolean>;

    nameAlreadyExist(item: ItemModel, toDoListId: number): Promise<boolean>;
}