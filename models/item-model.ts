interface ItemModelProps {
    name: string;
    content: string;
    dateHourAdd?: Date;
}

export class ItemModel implements ItemModelProps{
    content: string;
    dateHourAdd?: Date;
    name: string;

    constructor(properties: ItemModelProps) {
        this.content = properties.content;
        this.dateHourAdd = properties.dateHourAdd;
        this.name = properties.name;
    }
}