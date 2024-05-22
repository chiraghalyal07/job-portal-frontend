import {createContext,useContext,useReducer } from 'react'

 const AuthContext =createContext() 

export const useAuth=()=> {  // useAuth can use for multiple functionality
    return useContext(AuthContext)
}

const reducer =(state,action) =>{
    switch(action.type) {
        case 'LOGIN' : {
            return {...state, isLoggedIn:true , account:action.payload.account, profile:action.payload.profile}
        } 
        case 'LOGOUT' : {
            return {...state,isLoggedIn:false,account:null, profile:null}
        }
        case 'SET_PROFILE' :{
            return {...state,profile :action.payload}
        }
        case 'JOB':{
            return {...state, isLoggedIn:true,job:action.payload}
        }
        default:{
            return {...state}
        }
    }
}

export const AuthProvider = ({children}) => {

    const[user, dispatch]=useReducer(reducer, {
        isLoggedIn:false,
        account:null, 
        profile:null
    })
    //const [user, setUser] = useState()

    // const handleLogin = (user) => {
    //     setUser(user)
    // }

    // const handleLogout= () => {
    //     setUser(null)
    // }

    return (

        //<AuthContext.Provider value={{user,handleLogin, handleLogout}}>
        <AuthContext.Provider value={{user,dispatch}}>
             {children}
        </AuthContext.Provider>
    )
}