import BaseController from "./BaseController.js"
import ProductDataAccessObject from "../DataAccessObject/ProductDataAccessObject.js"

class ProductController extends BaseController{
    async onGetItemsRequest(_, res){
        ProductDataAccessObject.getProductDetails().then((itemData) => {
            res.json({
                itemData : itemData
            })
        })
    }
}

export default new ProductController(ProductDataAccessObject)