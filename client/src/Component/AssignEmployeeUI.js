import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import React from 'react'

function AssignEmployeeUI(props) {
    let availableEmployeeList = props.employeeList.filter(employeeData => {
        return !props.selectedEmployees.includes(employeeData)
    })
    return (
        <>  
            <div class="mb-2">
                {
                    availableEmployeeList.length > 0 &&
                    <DropdownButton
                        title="Select Employees" 
                        id="bg-nested-dropdown" 
                        variant='outline-secondary mb-2'
                        onSelect={eventKey => {
                            props.onEmployeeSelected(eventKey)
                        }}
                    >
                    {
                        availableEmployeeList.map(employeeData => {
                            return (
                                <Dropdown.Item eventKey={employeeData.userId}>
                                        {employeeData.username}
                                </Dropdown.Item>
                            )                            
                        })
                    }                   
                    </DropdownButton>
                }          
            </div>          
              
            <Table responsive striped bordered hover>
                <tbody>
                {
                    props.selectedEmployees.map(employeeData => {
                        return(
                            <tr>
                                <td class="fw-light">{employeeData.username}</td>
                                <td class="text-end">
                                    <Button 
                                        variant='danger rounded-pill fw-bold'
                                        onClick={() => {
                                            props.onEmployeeRemoved(employeeData)
                                        }}                       
                                    >
                                        Remove
                                    </Button>
                                </td>         
                            </tr>
                        )                                
                    })
                }
                </tbody>        
            </Table>                   
        </>
    )
}
export default AssignEmployeeUI