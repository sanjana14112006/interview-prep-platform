// src/features/auth/pages/Login.jsx --> (UI Layer)
// Role: User-facing forms.
// Handling: Collect user input via local useState, prevent page reloads with e.preventDefault(), trigger handleLogin / handleRegister from useAuth(), and navigate to / on success.


import React, {useState} from 'react'
import { useNavigate, Link } from 'react-router'
import "../auth.form.scss"
import { useAuth } from '../hooks/useAuth'


const Login = () => {

    const { loading, handleLogin } = useAuth()
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        await handleLogin({ email, password })                      // ser ka email aur password backend verify karwane ke liye bheja.   
        navigate('/')                                        // ogin success hone ke turant baad user ko homepage (/) par bhej diya.   
    } 

    if (loading) {
        return (<main><h1>Loading......</h1></main>)
    }

    return (
        <main>
            <div className="form-container">
                <h1>Login</h1>

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            onChange={( e ) => {setEmail(e.target.value)}}
                    type="email" id="email" name="email" placeholder='Enter email address' />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            onChange={( e ) => {setPassword(e.target.value)}}
                    type="password" id="password" name="password" placeholder='Enter password' />
                    </div>

                    <button className='button primary-button'>Login</button>
                </form>

                <p>Don't have an account? <Link to={"/register"}>Register</Link></p>        // Naye users ke liye registration page ka link de diya.   

            </div>
        </main>
    )
} 

export default Login