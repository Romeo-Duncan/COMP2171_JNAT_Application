import HttpClient from "./httpClient.js";

export default {
    async getProducts(){
        return HttpClient.post("/get-items", null, "itemData")
    }
}