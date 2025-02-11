import {useAuth} from "../context/AuthContext"
import CandidateProfile from "./CandidateProfile"
import RecruiterProfile from "./RecruiterProfile"
// export default function Account(){
//     const {user} = useAuth()
//     return(
//         <div>
//             <h2>Account Information</h2>
//             {user&&(
//                 <>
//                     <p>Username - {user.account.username}</p>
//                     <p>Email - {user.account.email}</p>
//                     <p>Role - {user.account.role}</p>
//                     {user.account.role =='candidate' ? <CandidateProfile/>:<RecruiterProfile/>}
//                     <p>Created At - {user.account.createdAt}</p>
//                 </>
//             )}
            
//         </div>
//     )
// }

export default function Account() {
    const {user} =useAuth()
    return (
        <div>
            <h2>Account Info</h2>
            {user && (
                <>
                    <p>username -- {user.account.username}</p>
                    <p>email--{user.account.email}</p>
                    <p>role--{user.account.role}</p>

                    {user.account.role == 'candidate' ? <CandidateProfile />: <RecruiterProfile />}
                </>
            )}
        </div>
            
    )
}