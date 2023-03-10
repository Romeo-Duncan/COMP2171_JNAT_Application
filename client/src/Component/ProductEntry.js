import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'
import Badge from 'react-bootstrap/Badge'
import Form from 'react-bootstrap/Form'
import React, {useState} from 'react'

function ProductEntry(props) {
    const [isActive, setActive] = useState(false)
    const [quantity, setQuantity] = useState(1)

    let product = props.product
    return (
        <>
            <div class="col-md-4 h-100">
                <div class="mb-2 fw-bolder">
                    {product.Name}
                </div>
                <div class="mb-2">
                    <Badge bg="secondary">{product.Category}</Badge> 
                </div>
                <div class="mb-2 fw-light">
                    {product.Description}
                </div>
                <div class="mb-2">
                    ${product.Price}
                </div>
                <div>
                    {                    
                        !isActive &&
                            <Button 
                                variant='primary'
                                bsPrefix="rounded-pill btn btn-primary ps-4 pe-4"
                                onClick={() => {
                                    setActive(true)
                                }}
                            >
                                Add
                            </Button>
                        ||
                        <div class="rounded-pill bg-primary">
                            {
                                !isActive && <>Add</>
                                || 
                                <>                        
                                    <InputGroup>
                                        <Button 
                                            bsPrefix="transparent ms-1"
                                            onClick={() => {
                                                setActive(false)
                                                setQuantity(1)
                                            }}                      
                                        >
                                            <i class="bi bi-x-lg text-light"/>
                                        </Button>

                                        <Form.Control
                                            type="number"
                                            min="1"
                                            max="100"
                                            id="q"
                                            placeholder="1"
                                            autoComplete="off"
                                            onChange={(e) => {
                                                setQuantity(parseInt(e.target.value))
                                            }}
                                            onKeyDown={(e) => {
                                                e.preventDefault()
                                            }}
                                        />  

                                        <Button 
                                            bsPrefix="transparent me-1"
                                            onClick={() => {
                                                setActive(false)
                                                props.onProductAdded(quantity)
                                                setQuantity(1)
                                            }}                      
                                        >
                                            <i class="bi bi-check-lg text-light"/>
                                        </Button>
                                    </InputGroup>                             
                                </>
                            }
                        </div>    
                    }            
                </div>                                
                <hr/>                                             
            </div>                                        
        </>
    )
}
export default ProductEntry