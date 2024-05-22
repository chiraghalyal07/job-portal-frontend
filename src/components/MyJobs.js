import axios from "axios"
import React,{ useEffect, useState } from "react"
import { Link } from "react-router-dom"

const MyJob = () =>{
    const[job,setJob] = useState([])
    // const history = useHistory();
    useEffect(() => {
       async function fetchingJob(){
            try {
                  const response = await axios.get('http://localhost:3333/api/jobs/my', {
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }
                  })
                  console.log(response.data)
                  setJob(response.data)
            }
            catch(error){
                console.log(error)
            }
        }
        fetchingJob()
    },[]);
    // const handleViewApplication = (applicationLink) => {
    //     // Navigate to new page with application link as URL parameter
    //     history.push(`/application/${applicationLink}`);
    //   };
    // handleClick = () =>{

    // }
    // const handleChange = (e) => {
    //     const { value, name } = e.target 
    //     setForm({...form, [name]: value })
    // }
    return (
        <div>
            <h2>MyJob</h2>
            <table border={1}>
              <thead>
                <tr>
                    <th>title</th>
                    <th>description</th>
                    <th>openings</th>
                    <th>location</th>
                    <th>jobType</th>
                    <th>minExp</th>
                    <th>maxExp</th>
                    <th>skills</th>
                    <th>dueDate</th>
                    <th>minSalary</th>
                    <th>maxSalary</th>
                    <th>action</th>
                </tr>
              </thead>
              <tbody>
                 {job.map((ele)=>{
                    return (
                        <tr key={ele._id}>
                            <td>{ele.title}</td>
                            <td>{ele.description}</td>
                            <td>{ele.openings}</td>
                            <td>{ele.location}</td>
                            <td>{ele.jobType}</td>
                            <td>{ele.experience.minExp}</td>
                            <td>{ele.experience.maxExp}</td>
                            <td>{ele.skills}</td>
                            <td>{ele.dueDate}</td>
                            <td>{ele?.salary?.minSalary}</td> 
                            <td>{ele?.salary?.maxSalary}</td>
                            {/* <td>
                                <button onClick={() => handleViewApplication(ele.applicationLink)}>view</button>
                                </td> */}
                            <td><button onClick={()=>{}}>
                                <Link to={`/job-applications/${ele._id}`}>View
                                </Link>
                                </button>
                            </td>
                            

                        </tr>
                    )
                 })}
              </tbody>
            </table>
        </div>
    )
};
export default MyJob;