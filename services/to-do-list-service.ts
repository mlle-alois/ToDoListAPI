import {ItemModel, ToDoListModel} from "../models";

export interface ToDoListService {
    createToDoList(options: ToDoListModel): Promise<ToDoListModel | null>;

    updateToDoList(options: ToDoListModel): Promise<ToDoListModel | null>;

    add(item: ItemModel): Promise<boolean>;

    waitingTimeIsOver(toDoListId: number): Promise<boolean>;

    nameAlreadyExist(itemName: string, toDoListId: number): Promise<boolean>;
}