    import { useState } from 'react'
    import axios from 'axios'

    const Login = () => {
    const [emailId, setEmail] = useState('ayman@gmail.com')
    const [password, setPassword] = useState('ayman123')

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
        const res = await axios.post(
            'http://localhost:3000/login',
            { emailId, password }, // <-- use emailId here!
            { withCredentials: true }
        )
        if (res.status === 200) {
            console.log('Login successful:', res.data)
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