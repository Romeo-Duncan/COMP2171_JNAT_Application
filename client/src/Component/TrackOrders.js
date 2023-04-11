import OrderStatus from '../Constant/OrderStatus.js'
import ViewOrderDetails from './ViewOrderDetails.js'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import React, {useState} from 'react'
import OrderService from '../Service/OrderService.js'

function TrackOrders(props){
  const [detailsShow, setDetailsShow] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState([]) 
  const orderData = props.trackingData || []
  
  return(
    <>
        {
            orderData.length == 0
            &&
            <div class="mt-3 fw-light fs-4">
                YOU HAVE NO ORDERS TO TRACK
            </div>
            ||
            <>
              <Table responsive striped bordered hover>
                  <thead>
                      <tr>
                      <th class="fw-bolder">Tracking Number </th>
                      <th class="fw-bolder">Date Placed</th>
                      <th class="fw-bolder">Status</th>
                      </tr>
                  </thead>
                  <tbody>
                      {
                          orderData.map(order => {
                              return(
                                  <tr>
                                      <td class="fw-light">{order.orderId}</td>
                                      <td class="fw-light">{(new Date(order.time)).toLocaleString()}</td>
                                      <td class="fw-light">{OrderStatus[order.status]}</td>
                                      <td class="text-center">
                                          <Button 
                                              variant='primary rounded-pill fw-bold'
                                              onClick={() => {
                                                    setSelectedOrder(order)
                                                    setDetailsShow(true)
                                              }}                       
                                          >
                                              View
                                          </Button>
                                          {
                                            order.status == 0 && 
                                            <Button 
                                            variant='danger rounded-pill fw-bold ms-2'
                                            onClick={() => {
                                                OrderService.updateOrderStatus(order.orderId, 3)
                                            }}                       
                                            >
                                                Cancel
                                            </Button> 
                                          }                                          
                                      </td>
                                  </tr>
                              )
                          })
                      }  
                  </tbody>
              </Table>
            </>
        }           
        <div/>
        <ViewOrderDetails
            show={detailsShow}
            onHide={() => setDetailsShow(false)}
            orderDetails={selectedOrder}
        />
    </>
)
}
export default TrackOrders