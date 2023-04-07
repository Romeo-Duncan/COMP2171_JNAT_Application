import OrderService from '../Service/OrderService.js'
import ViewOrderDetails from './ViewOrderDetails.js'
import OrderStatus from "../Constant/OrderStatus.js"
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import React, {useState, useEffect} from 'react'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'

function ViewAssignedOrdersUI(props){
    const [orderData, setOrderData] = useState([])
    const [detailsShow, setDetailsShow] = useState(false)
    const [orderDetails, setOrderDetails] = useState([])
    function updateOrderData(){
        OrderService.getAssignedOrders(props.userId).then((assignedOrderData) => {
            setOrderData(assignedOrderData || [])
        })
    }
    useEffect(() => {
        updateOrderData()
    }, [])
    return (
        <>
        <div class="fw-bold fs-3 mb-5 fw-bolder">
            ASSIGNED ORDERS     
        </div>
        {
                orderData.length == 0
                &&
                <div class="mt-3 fw-light fs-5 text-start">
                NO ORDERS TO DISPLAY
                </div>
                ||
                <div class = "text-start">
                    <div class="fw-bold fs-3 mb-3 fw-bolder">
                        {props.heading}       
                    </div>
                    <Table responsive striped bordered hover>
                        <thead>
                            <tr>
                            <th class="fw-bold">Tracking Number </th>
                            <th class="fw-bold">Date Placed</th>
                            <th class="fw-bold">Customer</th>
                            <th class="fw-bold">State</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                orderData.map(order => {
                                    return(
                                        <tr>
                                            <td class="fw-light">{order.orderId}</td>
                                            <td class="fw-light">{(new Date(order.time)).toLocaleString()}</td>
                                            <td class="fw-light">{order.customerData[0].username}</td>
                                            <td class="fw-light">
                                                <DropdownButton 
                                                    title={OrderStatus[order.status]} 
                                                    id="bg-nested-dropdown" 
                                                    variant='outline-secondary'
                                                    onSelect={eventKey => {
                                                        OrderService.updateOrderStatus(order.orderId, parseInt(eventKey)).then(()=>{
                                                            updateOrderData()
                                                        })                                              
                                                    }}
                                                >
                                                    {
                                                        OrderStatus.map((statusText, statusCode) => {
                                                            return(
                                                                <Dropdown.Item eventKey={statusCode}>{statusText}</Dropdown.Item>
                                                            )
                                                        })
                                                    }                     
                                                </DropdownButton>
                                                </td>   
                                            <td class="text-center">
                                                <Button 
                                                    variant='primary rounded-pill fw-bold'
                                                    onClick={() => {
                                                        setOrderDetails(order)
                                                        setDetailsShow(true)
                                                    }}                       
                                                >
                                                    View
                                                </Button>                                                                            
                                            </td>
                                        </tr>
                                    )
                                })
                            }  
                        </tbody>
                    </Table>
                </div>
            }           
            <div/>
            <ViewOrderDetails
                show={detailsShow}
                onHide={() =>{
                    setDetailsShow(false)        
                }}
                orderDetails={orderDetails}
            />
        </>
    )
}

export default ViewAssignedOrdersUI