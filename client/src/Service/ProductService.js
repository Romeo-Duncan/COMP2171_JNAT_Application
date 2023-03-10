import HttpClient from "./httpClient.js";

export default {
    async getProductDetails(){
        return HttpClient.post("/get-items", null, "itemData")
    }
}