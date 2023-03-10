import OrderService from '../Service/OrderService.js'
import ViewOrderDetails from './ViewOrderDetails.js'
import React, {useState, useEffect} from 'react'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'

function ViewOrders() {
  const [detailsShow, setDetailsShow] = useState(false)
  const [orderDetails, setOrderDetails] = useState([]) 
  const [orderData, setOrderData] = useState([])  
  
  useEffect(() => {
      OrderService.getAllOrders().then((orderData) => {
          if (orderData){
              console.log(orderData)
              setOrderData(orderData)
          }
      })
  }, [])

  return (
    <>
      <div class="text-start fs-2 mb-5">
        Customer Orders:
      </div>
      {
            orderData.length == 0
            &&
            <div class="mt-3 fw-light fs-5 text-start">
              NO ORDERS TO DISPLAY
            </div>
            ||
            <div class = "text-start">
              <Table responsive striped bordered hover>
                  <thead>
                      <tr>
                      <th class="fw-bolder">Tracking Number </th>
                      <th class="fw-bolder">Date Placed</th>
                      <th class="fw-bolder">Customer</th>
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
                                      <td>
                                          <Button 
                                              variant='primary rounded-pill fw-bold'
                                              onClick={() => {
                                                  console.log(order)
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
            onHide={() => setDetailsShow(false)}
            orderDetails={orderDetails}
        />
    </>
  )
}
export default ViewOrders