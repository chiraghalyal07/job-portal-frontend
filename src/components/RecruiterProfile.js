import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import axios from "axios"

export default function RecruiterProfile(){
    const {user,dispatch} = useAuth()
    console.log("Recruiter Profile",user)
    const [form,setForm] = useState({
        companyName:user.profile ? user.profile.companyName:"",
        email:user.profile ? user.profile.email:"",
        website:user.profile ? user.profile.website:"",
        address:user.profile ? user.profile.address:"",
        clientsideError:{},
        isEdit:false,
        serverSideerror:null     
    })
    const handleChange = (e) =>{
        const {value,name} = e.target
        setForm({...form,[name]:value})
    }
    const handleSubmit = async (e) =>{
        e.preventDefault()
        console.log(user.profile)
        if(user.profile){
            const response = await axios.put(`http://localhost:3333/api/recruiter/profile`,form,{
                headers:{
                    Authorization:localStorage.getItem('token')
                }
            })
            alert('profile updated')
            dispatch({type:"SET_PROFILE",payload:response.data})
        }else{
            const response = await axios.post(`http://localhost:3333/api/recruiter/profile`,form,{
                headers:{
                    Authorization:localStorage.getItem('token')
                }
            })
            alert('profile created')
            dispatch({type:'SET_PROFILE',payload:response.data})
        }
    }
    const handleToggle = () =>{
        setForm({...form,isEdit:!form.isEdit})
    }
    return(
        <div>
            <h2>Recruiter Profile</h2>
            <button onClick={handleToggle}>{form.isEdit? 'Cancle' : 'Edit'}</button>
            <form onSubmit={handleSubmit}>
                <label htmlFor="companyName">Company Name</label><br/>
                <input type="text" value={form.companyName} onChange={handleChange} name="companyName" id="companyName" disabled={!form.isEdit}/><br/>
                <label htmlFor="email">Email</label><br/>
                <input type="text" value={form.email} onChange={handleChange} name="email" id="email" disabled={!form.isEdit}/><br/>
                <label htmlFor="website">Website</label><br/>
                <input type="text" value={form.website} onChange={handleChange} name="website" id="website" disabled={!form.isEdit}/><br/>
                <label htmlFor="address">Address</label><br/>
                <input type="text" value={form.address} onChange={handleChange} name="address" id="address" disabled={!form.isEdit}/><br/>
                {form.isEdit && <input type="submit"/>}
            </form>
        </div>
    )
}