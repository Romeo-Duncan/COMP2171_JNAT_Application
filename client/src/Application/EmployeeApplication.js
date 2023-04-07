import ViewAssignedOrdersUI from "../Component/ViewAssignedOrdersUI"

function EmployeeApp(props){
    return(
        <>
            <div class="container dashboard-container pt-5">
                <div class="fit-content">
                    <ViewAssignedOrdersUI userId={props.userId}/>
                </div>                
            </div>            
        </>
    )
}
export default EmployeeApp