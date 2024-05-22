import {useAuth} from "../context/AuthContext"
// import {Navigate} from "react-router-dom"
// export default function PrivateRoute({permittedRoles, childern}){
//     const{user} = useAuth()
//     if(!user.isLoggedIn && localStorage.getItem('token')){
//         return <p>loading...</p>
//     }
//     if(!user.isLoggedIn){
//         return <Navigate to="/login"/>
//     }
//     if(!permittedRoles.includes(user.account.role)){
//         return <Navigate to="/unauthorized"/>
//     }
//     return childern
// }
// // user = null or { email, role } 
// user = { isLoggedIn: false, account: null, profile: null }  or { isLoggedIn: true, account: { username, email, role}, profile: { }}

// From front end to back end, there are so many steps we have to remember all at once. Are there any guidelines we can follow to remember all these steps?


// import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
export default function PrivateRoute({permittedRoles,children}) {
    const {user} = useAuth()
    
    if(!user.isLoggedIn && localStorage.getItem('token')) {
        return <p> Loading...</p>
    }

    if(!user.isLoggedIn) {
        return <Navigate to ="/Login" />
    }

    
    if(!permittedRoles.includes(user.account.role)) {
        return <Navigate to ="/unauthorized" />
    }

    return children

}

//user =null or { email, role} -- previously
// user = {isLoggedIn : false, account : null, profile: null} or  { is LoggedIn:true, account: {usernmae, email,role}, profile: {}}