import { useState } from 'react'
import validator from 'validator'
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from '../config/axios'
import _ from 'lodash'
import { useAuth } from '../context/AuthContext'
export default function Login() {

    const navigate = useNavigate()
    const {dispatch} =useAuth()
    const [form, setForm] = useState({
        email: '',
        password: '',
        serverErrors: null,
        clientErrors: {}
    })
    const errors = {}

    const runValidation = () => {
        if (form.email.trim().length === 0) {
            errors.email = 'email is required'
        } else if (!validator.isEmail(form.email)) {
            errors.email = 'email should be in a valid format'
        }

        if (form.password.trim().length === 0) {
            errors.password = 'password is required'
        } else if (form.password.trim().length < 8 || form.password.trim().length > 128) {
            errors.password = 'password should be between 8 to 128 characters'
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = _.pick(form, ['email', 'password'])

        runValidation()

        if(Object.keys(errors).length === 0) {
            try {
                const response = await axios.post('/users/login', formData)
                localStorage.setItem('token', response.data.token)
                const userResponse = await axios.get('/users/account', {
                    headers:{
                        Authorization:localStorage.getItem('token')
                    }
                })
               
                console.log(userResponse.data)
                dispatch({type:"LOGIN", payload:{account:userResponse.data}})

                // let url 
                // if(userResponse.data.role == 'candidate') {
                //     url = 'http://localhost:3333/api/candidates/profile'
                // } else {
                //     url = 'http://localhost:3333/api/recruiter/profile'
                // }

                // const profileResponse = await axios.get(url, { 
                //     headers: {
                //         Authorization: localStorage.getItem('token')
                //     }
                // })
                // console.log(profileResponse.data)
                // dispatch({ type: "LOGIN", payload: { account: userResponse.data, profile: profileResponse.data } })
                navigate('/')
            } catch (err) {
                setForm({ ...form, serverErrors: err.response.data.errors, clientErrors: {} })
            }
        } else {
            setForm({ ...form, clientErrors: errors })
        }
    }

    const handleChange = (e) => {
        const { value, name } = e.target 
        setForm({...form, [name]: value })
    }

    const displayErrors = () => {
        let result
        if(typeof form.serverErrors == 'string') {
            result = <p>{form.serverErrors}</p>
        } else {
            result = (
                <div>
                    <h3>These errors prohibited the form from being saved:</h3>
                    <ul>
                        {form.serverErrors.map((ele, i) => {
                            return <li key={i}>{ele.msg}</li>
                            
                        })}
                    </ul>
                </div>
            )
        }
        return result
    }

    return (
        <div>
            <h2>Login</h2>
            {form.serverErrors && displayErrors()}
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Enter Email</label> <br />
                <input
                    type="text"
                    value={form.email}
                    onChange={handleChange}
                    name="email"
                    id="email"
                />

                {form.clientErrors.email && <span>{form.clientErrors.email}</span>}
                <br />
                <label htmlFor="password">Enter Password</label> <br />
                <input
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                    id="password"
                    name="password"
                />
                
                {form.clientErrors.password && <span>{form.clientErrors.password}</span>}
                <br /> 
                <input type="submit" />
            </form>
            <Link to="/register">Create Account </Link>
            
        </div>
    )
}