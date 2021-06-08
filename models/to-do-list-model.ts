import {ItemModel} from "./item-model";

interface ToDoListModelProps {
    name: string;
    description: string;
    list: ItemModel[];
}

export class ToDoListModel implements ToDoListModelProps {
    private _name: string;
    private _description: string;
    list: ItemModel[];

    constructor() {
        this.list = [];
        this._name = "";
        this._description = "";
    }

    set description(value: string) {
        this._description = value;
    }
    set name(value: string) {
        this._name = value;
    }

}