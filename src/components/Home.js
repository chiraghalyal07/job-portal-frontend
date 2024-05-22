import {useAuth} from "../context/AuthContext"
// export default function Home(){
//     const {user} = useAuth()//useContext(AuthContext)
//     return(
//         <div>
//             <h2>Home Components</h2>
//             {/* {user&&<p>Welcome {user.username}..!</p>} */}
//             {!user.isLoggedIn ? <p>user not loggedin </p>:<p>Welcome{user.account.username}</p>}
//         </div>
//     )
// }
// import { useAuth } from "../context/AuthContext"
export default function Home() {

    const{user}= useAuth()
    return (
        <div>
            <h1>Home component</h1>
            {!user.isLoggedIn ? <p>user is not logged in</p> : <p>Welcome {user.account.username}</p>}
         
        </div>
    )
}