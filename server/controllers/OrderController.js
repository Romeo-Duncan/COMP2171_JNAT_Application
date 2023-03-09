import BaseController from "./BaseController.js"
import OrderDataAccessObject from "../daos/OrderDataAccessObject.js"

class OrderController extends BaseController{
    async onCreateOrderRequest(req, res){
        const body = req.body
        const userId = body.userId
        const orderData = JSON.parse(body.orderData)
        const time = parseInt(body.time)

        OrderDataAccessObject.createOrder(userId, orderData, time).then(()=>{
            res.json({
                success : true
            })
        })
    }
    async onGetCustOrdersRequest(req, res){
        const body = req.body
        const userId = body.userId

        OrderDataAccessObject.getCustOrders(userId).then((custOrdersData) => {
            res.json({
                custOrdersData : JSON.stringify(custOrdersData)
            })
        })
    }
    async onGetAllOrdersRequest(_, res){
        OrderDataAccessObject.getAllOrders().then((ordersData) => {
            res.json({
                ordersData : JSON.stringify(ordersData)
            })
        })
    }
    async onUpdateStatusRequest(req, res){
        const body = req.body
        const orderId = body.orderId
        const status = parseInt(body.status)

        OrderDataAccessObject.updateOrderStatus(orderId, status).then(() => {
            res.json({
                success : true
            })
        })
    }
    async onAssignEmployeeRequest(req, res){
        const body = req.body
        const orderId = body.orderId
        const employeeIdList = body.employeeIdList

        OrderDataAccessObject.assignOrder(orderId, employeeIdList).then(() => {
            res.json({
                success : true
            })
        })
    }
    async onCancelOrderRequest(req, res){
        const body = req.body
        const orderId = body.orderId

        OrderDataAccessObject.cancelOrder(orderId).then(() => {
            res.json({
                success : true
            })
        })
    }
    async getAssignedOrders(req, res){
        const body = req.body
        const employeeId = body.employeeId

        OrderDataAccessObject.getAssignedOrders(employeeId).then((ordersData) => {
            res.json({
                ordersData : JSON.stringify(ordersData)
            })
        })
    }
}

export default new OrderController(OrderDataAccessObject)