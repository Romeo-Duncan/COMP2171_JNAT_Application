import AssignEmployeeUI from './AssignEmployeeUI'
import Modal from 'react-bootstrap/Modal'
import Badge from 'react-bootstrap/Badge'

function ViewOrderDetails(props) {
    let total = 0
    if (props.orderDetails.length == 0){
        return(<></>)
    }
    props.orderDetails.orderData.forEach(item => {
        total += parseInt(item.Price) * parseInt(item.quantity)
    })
    return (
        <>
            <Modal
                {...props}
                size="md"
                centered
                > 
                <Modal.Header closeButton>
                    <div class="fs-3 fw-bolder">
                        Order <span class="fs-5 fw-light">  #{props.orderDetails.orderId}</span>
                    </div>                   
                </Modal.Header>   
                <Modal.Body> 
                    <div class="row mb-4 ">
                        <div class="row justify-content-between w-100 mx-auto">
                            <div class="col-6 fs-6 fs-4 fw-bold">
                                Total
                            </div>
                            
                            <div class="col-6 d-flex justify-content-end fs-4 fw-bold">
                                <div>
                                    ${total}
                                </div>
                            </div>
                        </div>              
                    </div>
                    <hr class="mb-4"/>
                    <div>
                    {
                        props.orderDetails.orderData.map(item => {
                            return(
                                <>
                                    <div class="row mb-2">
                                        <div class="row justify-content-between w-100 mx-auto">
                                            <div class="col-6 fs-6">
                                                <span class="">{item.Name}</span>
                                                <Badge bg="secondary fs-6 badge rounded-pill">x{item.quantity}</Badge>
                                            </div>
                                            
                                            <div class="col-6 d-flex justify-content-end">
                                                <div>
                                                    ${parseInt(item.Price) * parseInt(item.quantity)}
                                                </div>
                                            </div>
                                        </div>              
                                    </div>
                                </>
                            )
                        })
                    } 
                    </div>
                    <>
                        {
                            props.orderDetails.employeeData &&
                            <div class="row justify-content-between w-100 mx-auto mt-5">
                                <div class="fs-6 fs-4 fw-bold mb-4">
                                    Assigned Employees
                                </div>
                                <hr class="mb-4"/>
                                <AssignEmployeeUI
                                    employeeList={props.employeeList}
                                    selectedEmployees={props.selectedEmployees}
                                    onEmployeeSelected={props.onEmployeeSelected}
                                    onEmployeeRemoved={props.onEmployeeRemoved}
                                />
                            </div>                        
                        }
                    </>
                    <>
                        {
                            props.orderDetails.assignedEmployeeData && 
                            <div class="row justify-content-between w-100 mx-auto mt-5">
                                <div class="fs-6 fs-4 fw-bold mb-4">
                                    Assigned Employees
                                </div>
                                <div>
                                {
                                    props.orderDetails.assignedEmployeeData.map((employeeData, index) => {
                                        return (
                                            <>{employeeData.username}{index < props.orderDetails.assignedEmployeeData.length-1 && <>, </> ||<>.</>}</> 
                                        )
                                    })
                                }
                                </div>
                            </div>   
                        }
                    </>
                </Modal.Body>
                <Modal.Footer bsPrefix='mb-3 w-100'/>
            </Modal>   
        </>
    )
}
export default ViewOrderDetails