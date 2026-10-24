// src/features/auth/pages/Register.jsx --> (UI Layer)
// Role: User-facing forms.
// Handling: Collect user input via local useState, prevent page reloads with e.preventDefault(), trigger handleLogin / handleRegister from useAuth(), and navigate to / on success.


import React, {useState} from 'react'                        // React aur user input handle karne ke liye useState hook import kiya.
import { useNavigate,Link } from 'react-router'        // Ek page se doosre page redirect karne ke liye useNavigate aur link click par page jump karne ke liye Link component laye.
import { useAuth } from '../hooks/useAuth'                  // Apne custom auth hook se global authentication functions mangwaye.
import "../auth.form.scss"                              // Form ki styling wali SCSS file link ki.

const Register = () => {                                     // Register page ka main React component start kiya.

    const navigate = useNavigate()                              //Page change (redirect) karwane ke liye function ready kiya.
    const [username, setUsername] = useState("")            // Username ki value track karne ke liye state variable banaya.
    const [email, setEmail] = useState("")                         //Email ki value track karne ke liye state variable banaya.
    const [password, setPassword] = useState("")                         //Password store karne ke liye state variable banaya.

    const{loading, handleRegister} = useAuth()                  // Auth context se loading flag aur register function nikaala.

    const handleSubmit = async (e) => {                          // Jab user submit button dabayega tab ye function chalega.
        e.preventDefault()                                                //Form submit hone par jo browser poora reload ho jata hai, use roka.
        await handleRegister({username, email, password})                // Input fields ka data lekar backend par registration request bheji.
        navigate("/")                                                                //Register hote hi user ko seedha home page (/) par redirect kar diya.
    }

    if(loading) {                                                           // Agar backend se response aane me time lag raha hai, toh screen par Loading text dikhayega.
        return (<main><h1>Loading........</h1></main>)
    }

    return (
        <main>
            <div className="form-container">
                <h1>Register</h1>

                <form onSubmit={handleSubmit}>                           // orm banaya jo submit hone par handleSubmit function call karega.

                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input 
                            onChange={(e) => {setEmail(e.target.value)}}
                            type="email" id="email" name="email" placeholder='Enter email address' />
                    </div>


                    <div className="input-group">
                        <label htmlFor="username">Username</label>              // User ka typed username username state me update hoga.
                        <input 
                            onChange={(e) => {setUsername(e.target.value)}}
                            type="text" id="username" name="username" placeholder='Enter username' />
                    </div>


                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input 
                            onChange={(e) => {setPassword(e.target.value)}}                  // Typed password password state me store hoga.
                            type="password" id="password" name="password" placeholder='Enter password' />
                    </div>

                    <button className='button primary-button'>Register</button>             // Submit button jo form trigger karega.

                </form>

                <p>Already have an account? <Link to={"/login"}>Login</Link></p>              // Agar pehle se account hai toh bina page refresh kiye login page par le jayega.

            </div>
        </main>
    )
}

export default Register