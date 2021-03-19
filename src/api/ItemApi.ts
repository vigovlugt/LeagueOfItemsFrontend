import Item from "../models/Item";

export default class ItemApi {
    static async getAllItems(){
        const res = await fetch(process.env.API_URL + "/api/items");
        const items = await res.json();

        return items;
    }

    static async getItem(id){
        const res = await fetch(`${process.env.API_URL}/api/items/${id}`);
        const item = await res.json();

        return item;
    }
}