interface ItemModelProps {
    id: number;
    name: string;
    content: string;
    dateHourAdd?: Date;
    toDoList: number;
}

export class ItemModel implements ItemModelProps{
    id: number;
    name: string;
    content: string;
    dateHourAdd?: Date;
    toDoList: number;

    constructor(properties: ItemModelProps) {
        this.id = properties.id;
        this.content = properties.content;
        this.dateHourAdd = properties.dateHourAdd;
        this.name = properties.name;
        this.toDoList = properties.toDoList;
    }
}