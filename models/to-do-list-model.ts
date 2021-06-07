import {ItemModel} from "./item-model";

interface ToDoListModelProps {
    list: ItemModel[];
}

export class ToDoListModel implements ToDoListModelProps {
    list: ItemModel[];

    constructor() {
        this.list = [];
    }
}