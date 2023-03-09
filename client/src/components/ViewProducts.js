import ProductService from '../Services/ProductService.js'
import React, {useState, useEffect} from 'react'
import ProductEntry from './ProductEntry.js'

function ViewProducts(props) {
    const [productData, setProductData] = useState([])
    useEffect(() => {
        ProductService.getProducts().then((productData) => {
            if (productData) 
                setProductData(productData)            
        })
    }, [])
    return (
        <>
            <div class="row w-100 justify-content-left mx-auto">
                {
                    productData.map(product => {
                        return(
                            <>
                                <ProductEntry
                                    product = {product}
                                    onProductAdded = {(quantity) => {
                                        props.onProductAdded(product, quantity)
                                    }}
                                />  
                            </>
                        )                      
                    })
                }     
            </div>        
        </>
    )
}
export default ViewProducts