import Item from "../models/Item";

export default class ItemApi {
    static async getAllItems(){
        const res = await fetch("http://localhost:5001/api/items");
        const items = await res.json();

        return items;
    }

    static async getItem(id){
        const res = await fetch(`http://localhost:5001/api/items/${id}`);
        const item = await res.json();

        return item;
    }
}