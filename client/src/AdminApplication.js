import CreateUserAccount from "./components/CreateUserAccount.js"
import ViewUserAccounts from "./components/ViewUserAccounts.js"
import ViewOrders from './components/ViewOrders.js'
import { useState} from "react"
import "./css/App.css"

function AdminApp(props){  
    const [userConfigShow, setUserConfigShow] = useState(false)
    const [createUserShow, setCreateUserShow] = useState(false)  

    return(
        <>
            <div class="container dashboard-container text-end">
                <button type="button" onClick={() => setUserConfigShow(true)} class="btn btn-primary rounded-pill fw-bold mt-5 mb-5 ps-3 pe-3">
                    User Accounts
                </button>
                <ViewUserAccounts 
                    show={userConfigShow}
                    onHide={() => setUserConfigShow(false)}
                    onCreateUserRequest={() => {
                        setUserConfigShow(false)
                        setCreateUserShow(true)
                    }}
                /> 
                <CreateUserAccount
                    show={createUserShow}
                    onHide={() => setCreateUserShow(false)}
                    onUserAccountCreated = {() => setCreateUserShow(false)}
                /> 
                <div>
                    <ViewOrders/>
                </div>                    
            </div>                    
        </>
    )
}

export default AdminApp