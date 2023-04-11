import UserService from '../Service/UserService.js'
import OrderService from '../Service/OrderService.js'
import ViewOrderDetails from './ViewOrderDetails.js'
import OrderStatus from "../Constant/OrderStatus.js"
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import React, {useState, useEffect} from 'react'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'

function OrderListUI(props) {
    const [detailsShow, setDetailsShow] = useState(false)
    const [orderDetails, setOrderDetails] = useState([])
    const [selectedEmployees, setSelectedEmployees] = useState([])
    const [employeeList, setEmployeeList] = useState([])

    function loadEmployeeAccounts(){
        UserService.getUserData().then((data) => {
            if (!data.userData) 
                return
            const newEmployeeList = data.userData.filter((userData) => {
                return userData.type == "Employee"
            })
            setEmployeeList(newEmployeeList)
        })
    }
    useEffect(()=>{
       loadEmployeeAccounts()
    }, [])

    return (
        <>
            <div class="fw-bold fs-3 mb-5 fw-bolder">
                {props.heading}       
            </div>
            <Table responsive striped bordered hover>
                <thead>
                    <tr>
                    <th class="fw-bold">Tracking Number </th>
                    <th class="fw-bold">Date Placed</th>
                    <th class="fw-bold">Customer</th>
                    <th class="fw-bold">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.orderData.map(order => {
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
                                                    props.updateOrderData()
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
                                                setSelectedEmployees(employeeList.filter(employeeData => {
                                                    let isEmployeeAssignedOrder = false
                                                    order.employeeData.forEach(orderEmployeeData => {
                                                        if (!isEmployeeAssignedOrder && orderEmployeeData.username == employeeData.username){                                                            
                                                            isEmployeeAssignedOrder = true
                                                        }
                                                    })
                                                    return isEmployeeAssignedOrder
                                                }))
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
            <ViewOrderDetails
                show={detailsShow}
                onHide={() =>{
                    setDetailsShow(false)
                    const employeeIdList = selectedEmployees.map(employeeData => {
                        return employeeData.userId
                    })
                    OrderService.assignOrder(orderDetails.orderId, employeeIdList).then(() => {
                        props.updateOrderData()
                    })         
                }}
                orderDetails={orderDetails}
                employeeList={employeeList}
                selectedEmployees={selectedEmployees}
                onEmployeeSelected={
                    (employeeUserId) => {
                        setSelectedEmployees([...selectedEmployees, ...employeeList.filter(userData => {
                            return userData.userId == employeeUserId
                        })])
                    }
                }
                onEmployeeRemoved={
                    (employeeData) => {
                        setSelectedEmployees(selectedEmployees.filter(selectedEmployeeData => {
                            return selectedEmployeeData != employeeData
                        }))
                    }
                }
            />
        </>
    )
}
export default OrderListUI