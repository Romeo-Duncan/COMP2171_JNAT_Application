import UserService from '../Services/UserService.js'

import { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'
import Badge from 'react-bootstrap/Badge'
import Modal from 'react-bootstrap/Modal'

import UserIcon from "../icons/user-icon.js"
import "../css/ViewUserAccounts.css"

function ViewUserAccounts(props){
    const [userList, setUserList] = useState()

    useEffect(() => {
        UserService.getUserData().then((data) => {
            if (!data.userData){
                return
            }

            let renderData = []                      
            function createUserHeading(heading){
                return(
                    <>
                        <div class = "mt-3 mb-3">
                            <Badge bg="secondary">{heading}</Badge>
                        </div>                            
                    </>
                )
            }
            if (data.userData.length == 0){
                renderData.push(
                    <div class = "mt-3 mb-3 text-center">
                        No User Accounts Created!
                    </div>    
                )
            } else {
                let wasEmployeeHeadingCreated = false   
                let wasCustomerHeadingCreated = false            
                data.userData.forEach((userData) => {
                    const passwordPopover = (
                        <Popover id="popover-basic">
                            <Popover.Header as="h3">{userData.username}'s password</Popover.Header>
                            <Popover.Body>
                                {userData.password}
                            </Popover.Body>
                        </Popover>
                    )
                    if (userData.type == "Employee" && !wasEmployeeHeadingCreated){
                        wasEmployeeHeadingCreated = true
                        renderData.push(createUserHeading("Employees"))
                    }
                    if (userData.type != "Employee" && !wasCustomerHeadingCreated){
                        wasCustomerHeadingCreated = true
                        renderData.push(createUserHeading("Customers"))
                    }
                    renderData.push(
                        <div class="row mb-2">
                            <div class="row justify-content-between w-100 mx-auto">
                                <div class="col-6 fs-6">@{userData.username}</div>
                                <div class="col-6 d-flex justify-content-end">
                                    <OverlayTrigger  placement="left" overlay={passwordPopover}>
                                        <Button  bsPrefix="btn btn-outline-secondary w-75" >******</Button>
                                    </OverlayTrigger>   
                                </div>
                            </div>              
                        </div>
                    )
                }) 
            }                       
            setUserList(renderData)          
        })
    })
    return(
        <>
            <Modal
                {...props}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                >
                    <Modal.Body>
                        <div class="text-center mt-5 mb-5">
                            <Button onClick={() => {
                                props.onCreateUserRequest()
                            }} variant="outline-dark" bsPrefix="create-user-button btn btn-outline-primary">
                                create new account
                            </Button>
                        </div>
                        <hr/>     
                        <div class="row text-center mt-5 mb-5 mx-auto">
                            <UserIcon class= "user-icon mx-auto"/>
                            <p class = "fs-4">User Accounts</p>
                        </div>    
                        <div class="mx-auto d-block container">
                            {userList}
                        </div>
                                                          
                    </Modal.Body>
            </Modal>
        </>
    )
}
export default ViewUserAccounts