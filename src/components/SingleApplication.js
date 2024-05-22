import axios from "../config/axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function SingleApplication() {
    const { id, appId } = useParams();
    const [job, setJob] = useState(null);
    const [status, setStatus] = useState('');
    const [update,setUpdate] = useState(null)
    const[ candidate,setCandidate] = useState('')
    const statusTypes = [
        { name: 'Submitted' },
        { name: 'Under-review' },
        { name: 'Rejected'},
        { name: 'Accepted' },
    ];

    useEffect(() => {
        async function fetchingJob() {
            try {
                const response = await axios.get(`/api/jobs/${id}/applications/${appId}`, {
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }
                });
              
                setJob(response.data);
            } catch (error) {
                console.error("Error fetching job:", error);
            }
        }
        fetchingJob();
    }, [id, appId]);
    useEffect(() => {
        async function fetchingJob() {
            try {
                const response = await axios.get(`/api/jobs/${id}/applications/${appId}`, {
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }
                });
              
                setCandidate(response.data);
                console.log(response.data)
            } catch (error) {
                console.error("Error fetching job:", error);
            }
        }
        fetchingJob();
    }, [id,appId]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`/api/jobs/${id}/applications/${appId}`, {
                status: status
            }, {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            });
            // console.log(response.data);
            
            setUpdate(response.data.status);
            console.log(response.data)
            
           
        } catch (error) {
            console.error(error);
           
        }
    };
    

    const handleChange = (e) => {
        const { value } = e.target;
        // console.log(value);
        setStatus(value);
    };
    const getStatusColor = (status) => {
        switch(status) {
            case 'Accepted':
                return 'green';
            case 'Rejected':
                return 'red';
            case 'Under-review':
                return 'orange';
            case 'Submitted':
                return 'blue';
            default:
                return 'black';
        }
    };

    return (
        <div>
            <h2>Single Application</h2>
            <h2>Job Info</h2>
            <h4><strong>Job ID : </strong> {job?.job._id}</h4>
            <h4>Title : {job?.job.title}</h4>
            <h4>Status : <span style={{ color: getStatusColor(update || job?.status)}}>
                   <b> {update || job?.status}</b>
                </span></h4>
         
            
            <form onSubmit={handleSubmit}>
                <select value={status} onChange={handleChange}>
                    <option value="" >Select status : </option>
                    {statusTypes.map((ele, i) => (
                        <option key={i} value={ele.name}>{ele.name}</option>
                    ))}
                </select><br />
                <button type="submit">Update</button>
            </form>
            <h2>candidate info </h2> 
            {candidate &&
             <> 
             <h3>username:{candidate.candidate.username}</h3>
             <h3>email:{candidate.candidate.email}</h3>
             <h3>role:{candidate.candidate.role}</h3>
             </>
            }

        </div>
    );
}