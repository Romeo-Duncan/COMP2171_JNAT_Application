import OrderService from './Services/OrderService.js'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'
import { useState, useEffect } from "react"
import ViewProducts from './components/ViewProducts.js'
import ShoppingCart from './components/ShoppingCart.js'
import TrackOrders from './components/TrackOrders.js'
import "bootstrap-icons/font/bootstrap-icons.css"
import "./css/App.css"

const tabs = {
    viewProducts : 1,
    trackOrders : 2,
    shoppingCart : 3
}

function TabButton(props){
    return (
        <Button variant="light" onClick={props.clickListener}>
            <div class="text-start fs-6">
                {props.headingText}
            </div>
            
            <div class="text-start fw-bold fs-6">
                {props.bodyText}
            </div>
            
            {props.isActive && <div class="bg-primary div-line mt-2"/> || <div class="div-line mt-2"/>}            
        </Button>
    )
}
function CustomerApp(props){
    const [activeTab, setActiveTab] = useState(tabs.viewProducts)
    const [cartData, setCartData] = useState(JSON.parse(sessionStorage.getItem("cartData")) || [])
    const [orderData, setOrderData] = useState([])

    const createTabButtonListener = (linkedTab) => {
        return () => {
            setActiveTab(linkedTab)
        }
    }
    const updateCartData = (newCartData) => {
        setCartData(newCartData)
        sessionStorage.setItem("cartData", JSON.stringify(newCartData))
    }
    useEffect(() => {      
        OrderService.getCustOrders(props.userId).then((customerOrderData) => {
            if (customerOrderData)
                setOrderData(customerOrderData)                            
        })
    }, [])    
    
    return(
        <>           
            <div class="container dashboard-container ps-5 pe-5">
                <div class="row justify-content-between w-100 mx-auto mt-5">
                    <div class="col-8 fs-6">
                        <ButtonGroup>     
                            <TabButton
                                headingText="View"
                                bodyText="Products"
                                clickListener={createTabButtonListener(tabs.viewProducts)}
                                isActive={activeTab == tabs.viewProducts}
                            />
                            <TabButton
                                headingText="Track"
                                bodyText="Orders"
                                clickListener={createTabButtonListener(tabs.trackOrders)}
                                isActive={activeTab == tabs.trackOrders}
                            />
                        </ButtonGroup>
                    </div>                    
                    <div class="col-4 d-flex justify-content-end">
                        <Button
                            variant="light ps-4"
                            onClick={createTabButtonListener(tabs.shoppingCart)}
                        >
                            <i
                                class={activeTab == tabs.shoppingCart && "bi bi-cart fs-3 text-primary" || "bi bi-cart fs-3"}
                            />
                            <span class="translate-middle badge rounded-pill bg-primary">
                                    {cartData.length}
                            </span>                           
                        </Button>
                    </div>
                </div>
                <hr/>                
                <div class="mt-5 mb-5">
                    {
                        activeTab == tabs.viewProducts && 
                            <>
                                <ViewProducts
                                    onProductAdded = {(product, quantity) =>{
                                        let wasProductInCart = false
                                        const newCartData = cartData.map(cartProduct => {
                                            if (product.ItemId == cartProduct.ItemId){
                                                wasProductInCart = true
                                                return {...product, Quantity : cartProduct.Quantity + quantity}
                                            }
                                            return cartProduct
                                        })
                                        if (!wasProductInCart){
                                            newCartData.push({
                                                Quantity : quantity,
                                                Name : product.Name,
                                                Price : parseInt(product.Price),
                                                ItemId : product.ItemId
                                            })     
                                        }                
                                        updateCartData(newCartData)
                                    }}
                                />
                            </>
                        || 
                        activeTab == tabs.trackOrders && 
                        <TrackOrders
                            trackingData = {orderData}
                        />
                        ||
                        <ShoppingCart 
                            cartData = {cartData}
                            onItemRemoved = {(removeIndex)=>{
                                const newCartData = cartData.filter((_, index) => {
                                    return index != removeIndex
                                })
                                updateCartData(newCartData)
                            }}
                            onOrderPlaced = {()=> {                                    
                                updateCartData([])
                            }}
                            userId = {props.userId}
                        />
                    }
                </div>
            </div>
        </>
    )
}
export default CustomerApp