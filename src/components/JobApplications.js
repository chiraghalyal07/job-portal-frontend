import axios from "../config/axios"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

export default function JobApplications(){
    const {id} = useParams()
    const[jobApp,setJobApp] = useState([])
    const[candidate,setCandidate] = useState([])
    useEffect(()=>{
        async function fetchingJobApp(){
              const response = await axios.get(`/api/jobs/${id}/applications`,{
                headers:{
                    Authorization:localStorage.getItem('token')
                }
              })
              setJobApp(response.data)
              console.log(response.data)
        }
        fetchingJobApp()
    },[id]);
    useEffect(()=>{
        async function fetchingJobApp(){
              const response = await axios.get(`/api/jobs/${id}/applications`,{
                headers:{
                    Authorization:localStorage.getItem('token')
                }
              })
              setCandidate(response.data)
              console.log(response.data)
        }
        fetchingJobApp()
    },[])
    return (
        <div>
            <h2>Job Application</h2>
                {jobApp.map((ele)=>{
                    return (
                        <div>
                        <table border={1}>
                            <thead>
                                <tr key={ele._id}>
                                    <th>ID -     </th>
                                    <th>Name</th>
                                    <th>Status - </th>
                                    <th>View</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr key={ele._id}>
                                    <td> <Link to={`/single-application/${ele.job}/applications/${ele._id}`}>{ele._id}</Link>      </td>
                                    <td>{ele.candidate.username}</td>
                                    <td>  {ele.status} </td>
                                    <td><Link to={`/single-application/${ele.job}/applications/${ele._id}`}><button>View</button></Link>      </td>
                                </tr>
                            </tbody>

                        </table>
                        
                        
                            </div>
                        // <li key={ele._id}>username:{candidate.candidate.username}
                        //     <div>
                        //         <p>id</p> - <Link to={`/single-application/${ele.job}/applications/${ele._id}`}>{ele._id}</Link>
                        //     </div>
                        //     <div>
                        //         <p>status</p> - {ele.status}
                        //     </div>
                        // </li>
                        // <div>
                        //     <li key={id}> <strong>id</strong> - <Link to ={`/single-application/${ele.job}/applications/${ele._id}}`>{ele._id}</Link> </li>
                        //     <li> <strong>status</strong> - {ele.status}</li>
                        // </div>
                       
                    )
                })}
             

        </div>
    )
}