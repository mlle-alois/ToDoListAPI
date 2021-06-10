import {ItemModel} from "./item-model";

interface ToDoListModelProps {
    id: number;
    name?: string;
    description?: string;
    utilisateur: number;
    list: ItemModel[];
}

export class ToDoListModel implements ToDoListModelProps {
    id: number;
    name?: string;
    description?: string;
    utilisateur: number;
    list: ItemModel[];

    constructor(properties: ToDoListModelProps) {
        this.list = [];
        this.id = properties.id;
        this.name = properties.name;
        this.description = properties.description;
        this.utilisateur = properties.utilisateur;
    }

}