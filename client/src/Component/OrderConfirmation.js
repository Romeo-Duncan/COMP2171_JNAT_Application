import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import React from 'react'

function OrderConfirmation(props) {
    return (
        <>
            <Modal
                {...props}
                size="md"
                centered
                >            
                <Modal.Body> 
                    <div class="text-center mt-4">
                        <i class="bi bi-exclamation-triangle-fill fs-1 text-primary"></i>
                    </div>
                    
                    <div class="fs-2 fw-bold text-center text-primary">
                        Are you sure?         
                    </div>

                    <div class="mt-2 fs-5 fw-light text-center mb-3">
                        Ensure that you double-check your order before placing it.     
                    </div>                        
                </Modal.Body>
                
                <Modal.Footer bsPrefix=' w-100 mb-3'>
                    <hr/>    
                    <div class="mx-auto justify-content-center text-center">
                        <Button variant="danger w-25 rounded-pill fw-bold me-4" onClick={()=>props.onHide()}>No</Button>
                        <Button variant="primary w-25 rounded-pill fw-bold" onClick={()=>props.onConfirmed()}>Yes</Button>    
                    </div>               
                </Modal.Footer>
            </Modal>   
        </>
    )
}
export default OrderConfirmation