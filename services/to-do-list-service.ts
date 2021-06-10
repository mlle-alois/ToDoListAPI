import {ItemModel, ToDoListModel} from "../models";

export interface ToDoListService {
    createToDoList(options: ToDoListModel): Promise<ToDoListModel | null>;

    createItem(options: ItemModel): Promise<ItemModel | null>;

    updateToDoList(options: ToDoListModel): Promise<ToDoListModel | null>;

    add(item: ItemModel, toDoListId: number): Promise<boolean>;

    waitingTimeIsOver(toDoListId: number): Promise<boolean>;

    nameAlreadyExist(itemName: string, toDoListId: number): Promise<boolean>;
}