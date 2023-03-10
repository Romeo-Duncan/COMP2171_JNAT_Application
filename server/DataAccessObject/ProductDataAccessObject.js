import BaseDataAccessObject from "./BaseDataAccessObject.js"

class ProductDataAccessObject extends BaseDataAccessObject {
    async getProductDetails(){
        const itemData = await this.collection.aggregate([
            { $sort : { Category : 1 } },            
            { $addFields: { ItemId : "$_id" } },
            { $unset : [ "_id" ] }
        ]).toArray()

        itemData.forEach(element => {
            element.ItemId = element.ItemId.toString()
        })

        return itemData
    }
}
export default new ProductDataAccessObject("Inventory")