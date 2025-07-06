import { useState } from 'react'
import axios from 'axios'
import {  useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from './Utils/constants'
// Login.jsx



const Login = () => {
    const [emailId, setEmail] = useState('ahmed.benali@gmail.com')
    const [password, setPassword] = useState('ahmed123')
    const dispatch = useDispatch()    
    const navigate = useNavigate()


    // Handle form submission
    // Use emailId instead of email for consistency with your backend


    
    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
        const res = await axios.post( BASE_URL +  '/login',
            { emailId, password }, // <-- use emailId here!
            { withCredentials: true }
        )
        if (res.status === 200) {
            // Assuming the response contains user data
            console.log(res.data)
            // Dispatch an action to update the user state in Redux store
        dispatch({ type: 'user/addUser', payload: res.data.user })    
        return navigate('/feed') // Redirect to feed after successful login
        }
        } catch (error) {
        console.error('Login failed:', error)
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-base-200">
        <div className="card w-full max-w-sm shadow-2xl bg-base-100">
            <form className="card-body" onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
            <div className="form-control">
                <label className="label">
                <span className="label-text">Email</span>
                </label>
                <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                value={emailId}
                onChange={e => setEmail(e.target.value)}
                required
                />
            </div>
            <div className="form-control">
                <label className="label">
                <span className="label-text">Password</span>
                </label>
                <input
                    type="password"
                    placeholder="password"
                    className="input input-bordered"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />
            </div>
            <div className="form-control mt-6">
                <button className="btn btn-primary" type="submit">
                Login
                </button>
            </div>
            </form>
        </div>
        </div>
    )
    }

export default Login