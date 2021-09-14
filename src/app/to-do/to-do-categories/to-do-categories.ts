import { IToDoItem } from "../to-do-item/to-do-item";

export interface IToDoCategory {
    name: string
    items: IToDoItem[]
}