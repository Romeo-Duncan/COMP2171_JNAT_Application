import BaseController from "./BaseController.js"
import ProductDataAccessObject from "../daos/ProductDataAccessObject.js"

class InventoryController extends BaseController{
    async onGetItemsRequest(_, res){
        ProductDataAccessObject.getItems().then((itemData) => {
            res.json({
                itemData : itemData
            })
        })
    }
}

export default new InventoryController(ProductDataAccessObject)