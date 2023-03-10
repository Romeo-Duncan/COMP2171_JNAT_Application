import BaseController from "./BaseController.js"
import UserDataAccessObject from "../DataAccessObject/UserDataAccessObject.js"

class UsersController extends BaseController{
    async onLoginRequest(req, res){
        const body = req.body
        const username = body.username
        const password = body.password
        
        UserDataAccessObject.verifyLoginRequest(username, password).then(userData => {
            res.json({
                userType : userData.type || null,
                userId : userData.userId || null

            })
        })      
    }
    async onGetUsersDataRequest(_, res){
        UserDataAccessObject.getUsersData().then((userData) => {
            res.json({
                userData : userData
            })
        })
    }
    async onCreateUserRequest(req, res){
        const body = req.body
        const username = body.username
        const password = body.password
        const type = body.type

        UserDataAccessObject.createUser(username, password, type).then((wasAccountCreated) => {
            res.json({
                wasAccountCreated : wasAccountCreated
            })
        })
    }
}

export default new UsersController(UserDataAccessObject)