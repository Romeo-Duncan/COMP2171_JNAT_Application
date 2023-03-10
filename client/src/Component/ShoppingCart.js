import OrderService from '../Service/OrderService.js'
import OrderConfirmation from './OrderConfirmation.js'
import Badge from 'react-bootstrap/esm/Badge'
import Button from 'react-bootstrap/Button'
import React, {useState} from 'react'

function ShoppingCart(props){
    const [confirmationShow, setConfirmationShow] = useState(false)

    let cartTotal = 0
    props.cartData.forEach(item => {
        cartTotal += item.Price * item.Quantity
    })
    return(
        <> 
            {
                props.cartData.length > 0?         
                <div class="ms-3 me-3 mb-5">
                    <div class="row mb-2">
                        <div class="row justify-content-between w-100 mx-auto">
                            <div class="col-8 fs-3 fw-bolder">
                                Shopping Cart Total : ${cartTotal}
                            </div>                            
                            <div class="col-4 d-flex justify-content-end">
                                <div>                                
                                    <Button 
                                        variant='primary rounded-pill fw-bold'
                                        onClick={() => {
                                            setConfirmationShow(true)
                                        }}                       
                                    >
                                        Place Order
                                    </Button>                                                               
                                </div>
                            </div>
                        </div>              
                    </div>  
                    <hr class="mt-5"></hr>              
                </div>
                :
                <div class="fs-4 fw-light ms-3">
                   YOUR CART IS EMPTY
                </div>
            }            
            <div class="ms-3 me-3">
                {
                    props.cartData.map((item, index) => {
                        return(
                            <div class="row mb-2">
                                <div class="row justify-content-between w-100 mx-auto">
                                    <div class="col-6 fs-6">
                                        <Button 
                                            variant='outline-dark rounded-pill'
                                            onClick={() => {
                                               props.onItemRemoved(index)
                                            }}                       
                                        >
                                            <i class="bi bi-trash3-fill ps-2 pe-2"/>
                                        </Button> 

                                        <span class="ms-3 me-2">{item.Name}</span>
                                        <Badge bg="secondary fs-6 badge rounded-pill">x{item.Quantity}</Badge>
                                    </div>
                                    
                                    <div class="col-6 d-flex justify-content-end">
                                        <div>
                                            ${item.Price * item.Quantity}
                                        </div>
                                    </div>
                                </div>              
                            </div>
                        )
                    })
                } 
            </div> 
            <OrderConfirmation
                show={confirmationShow}
                onHide={() => setConfirmationShow(false)}
                onConfirmed = {() => {
                    const orderData = props.cartData.map(item =>{
                        return {
                            itemId : item.ItemId,
                            quantity : item.Quantity
                        }
                    })
                    setConfirmationShow(false)
                    OrderService.createOrder(props.userId, orderData)
                    props.onOrderPlaced()                    
                }}
            />
        </>
    )
}

export default ShoppingCart