import axios from "../config/axios";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function AddJob() {
    const { dispatch } = useAuth();
    const [jobCreated, setJobCreated] =useState(false)
    const jobType = [
        {name:"Work from Home",value:"wfh"},
        {name:"Work from Office",value:"wfo"},
        {name:"Hybrid",value:"hybrid"}
    ]
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        openings: 0,
        location: "",
        jobType: "",
        experience: { minExp: "", maxExp: "" }, // Update nested structure
        skills: "",
        dueDate: "",
        salary: { minSalary: "", maxSalary: "" }, // Update nested structure
        serverErrors: null,
        clientErrors: {}
    });

    const runValidations = () => {
        const errors = {};
        if (formData.title.trim().length === 0) {
            errors.title = 'Title is required';
        }
        if (formData.description.trim().length === 0) {
            errors.description = 'Description is required';
        }
        if (formData.location.length === 0) {
            errors.location = 'Location is required';
        }
        if (formData.openings === 0) {
            errors.openings = 'Openings is required';
        }
        if (formData.jobType.trim().length === 0) {
            errors.jobType = 'JobType is required';
        }
        if (formData.experience.minExp.trim().length === 0) {
            errors.minExp = 'Min experience is required';
        }
        if (formData.experience.maxExp.trim().length === 0) {
            errors.maxExp = 'Max experience is required';
        }
        if (formData.skills.length === 0) {
            errors.skills = 'Skills is required';
        }
        if (formData.salary.minSalary.trim().length === 0) {
            errors.minSalary = 'Min salary is required';
        }
        if (formData.salary.maxSalary.trim().length === 0) {
            errors.maxSalary = 'Max salary is required';
        }

        return errors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'skills') {
            // Split the comma-separated string into an array
            const skillsArray = value.split(',').map(ele=>ele.trim());
            // console.log('Skills Array:', skillsArray); // Check if this log appears
            setFormData({...formData,[name]: skillsArray // Rest of the code...
            });
        }else if(name ==='location'){
            const locationArray = value.split(',').map(ele=>ele.trim())
            setFormData({...formData,name:locationArray})

        }
        else {
        setFormData({...formData,[name]: value,// Handle nested fields
            experience: {
                ...formData.experience,
                [name]: value
            },
            salary: {
                ...formData.salary,
                [name]: value
            }
        });
    }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    // console.log('Form submitted'); // Check if this log appears
    const errors = runValidations();
    // console.log('Errors:', errors); 
        if (Object.keys(errors).length === 0) {
            try {
                const response = await axios.post('/api/jobs', formData, {
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }
                });
                console.log(response.data);
                alert('Job Created');
                dispatch({ type: 'JOB', payload: response.data });
                setJobCreated(true)
                console.log(jobCreated)
            } catch (error) {
                console.log(error);
            }
        } else {
            setFormData({ ...formData, clientErrors: errors });
        }
    };
    return (
        <div>
            <h2>Add Job</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Enter title</label><br />
                <input type="text" id="title" value={formData.title} name="title" onChange={handleChange} /><br />
                
                <label htmlFor="description">Description</label><br />
                <textarea id="description" value={formData.description} name="description" onChange={handleChange} ></textarea><br />

                <label htmlFor="openings">openings</label><br />
                <input type="text" id="openings" value={formData.openings} name="openings" onChange={handleChange} /><br />

                <label htmlFor="location">Location</label><br />
                <input type="text" id="location" value={formData.location} name="location" onChange={handleChange} /><br />

                <label htmlFor="jobType">JobType</label><br />
                <select id="jobType" value={formData.jobType} name="jobType" onChange={handleChange}>
                    <option value="">Select Type</option>
                    {jobType.map((ele,i)=>{
                        return <option key={i} value={ele.value}></option>
                    })}</select><br />

                <label htmlFor="minExp">Min Experience</label><br />
                 <input type="text" id="minExp" value={formData.experience.minExp} name="minExp" onChange={handleChange} /><br />

                <label htmlFor="maxExp">Max Experience</label><br />
                 <input type="text" id="maxExp" value={formData.experience.maxExp} name="maxExp" onChange={handleChange} /><br />

                <label htmlFor="skills">Skills</label><br />
                <input type="text" id="skills" value={formData.skills} name="skills" onChange={handleChange} /><br />
                
                <label htmlFor="dueDate">dueDate</label><br />
                <input type ="Date" id="dueDate" value={formData.dueDate} name="dueDate" onChange={handleChange}/><br />

               
              <label htmlFor="minSalary">Min Salary</label><br />
              <input type="text" id="minSalary" value={formData.salary.minSalary} name="minSalary" onChange={handleChange} /><br />

             <label htmlFor="maxSalary">Max Salary</label><br />
             <input type="text" id="maxSalary" value={formData.salary.maxSalary} name="maxSalary" onChange={handleChange} /><br />

                <input type="submit" />
            </form>
        </div>
    );
}