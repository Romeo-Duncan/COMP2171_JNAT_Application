import OrderService from '../Service/OrderService.js'
import React, {useState, useEffect} from 'react'
import OrderListUI from './OrderListUI.js'

function ViewOrders(){  
    const [assignedOrderData, setAssignedOrderData] = useState([])
    const [unassignedOrderData, setUnassignedOrderData] = useState([])

    function loadOrderData(){
        OrderService.getAllOrders().then((orderData) => {
            if (orderData){
                let newAssignedOrderData = []
                let newUnassignedOrderData = []
                orderData.map(order => {
                    const employeeData = order.employeeData
                    if (employeeData && employeeData.length > 0){
                        newAssignedOrderData.push(order)
                    } else {
                        newUnassignedOrderData.push(order)
                    }
                })
                setUnassignedOrderData(newUnassignedOrderData)
                setAssignedOrderData(newAssignedOrderData)     
            }
        })
    }

    useEffect(() => {
        loadOrderData()
    }, [])

    return (
        <>
        {
                (unassignedOrderData.length == 0 && assignedOrderData.length == 0)
                &&
                <div class="mt-3 fw-light fs-5 text-start">
                NO ORDERS TO DISPLAY
                </div>
                ||
                <div class = "text-start">
                    {
                        unassignedOrderData.length > 0 &&
                        <OrderListUI orderData={unassignedOrderData}
                        updateOrderData={loadOrderData}
                        heading="UNASSIGNED ORDERS"
                        />
                    }
                    {
                        assignedOrderData.length > 0 && 
                        <>
                            <hr class="mt-5 mb-5"/>
                            <OrderListUI orderData = {assignedOrderData}
                            updateOrderData={loadOrderData}
                            />
                        </>                        
                    }
                </div>
            }           
            <div/>
        </>
    )
}
export default ViewOrders