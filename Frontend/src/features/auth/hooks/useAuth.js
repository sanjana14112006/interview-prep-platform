// src/features/auth/hooks/useAuth.js --> (Custom Hook & Business Logic)
// Role: Bridge between the UI components, Context state, and API requests.
// Functions:
// handleLogin: Sets loading to true, calls login() API, saves user to context via setUser, and turns loading off.
// handleRegister: Calls register() API, sets the user state on success.
// handleLogout: Calls logout() API and clears the state with setUser(null).
// useEffect: Runs once on app startup to call getMe(). This keeps the user logged in even if they refresh the browser.


import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context";
import { login, register, logout, getMe } from "../services/auth.api";


export const useAuth = () =>  {
 
    const context = useContext(AuthContext)
    const { user, setUser, loading, setLoading } = context

    
    const handleLogin = async ({ email, password }) => {
        setLoading(true)                  
        try {
            const data = await login({ email, password })        // calling api
            setUser(data.user)                                       // api se jo bhi data aayega uske user ko se ker denge set user mein 
        } catch (err) {

        } finally {
            setLoading(false)
        }
    }

    const handleRegister = async ({ username, email, password }) => {
        setLoading(true)
        try {
            const data = await register({ username, email, password })
            setUser(data.user)
        } catch (err) {

        } finally {
            setLoading(false)
        }
    }

    const handleLogout = async () => {
        setLoading(true)
        try {
            const data = await logout()
            setUser(null)
        } catch (err) {

        } finally {
            setLoading(false)
        }
    }


    useEffect(() => {
        const getAndSetUser = async () => {
            try {
                const data = await getMe()
                setUser(data.user)
                setLoading(false)
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        getAndSetUser()

    }, [])

    return { user, loading, handleRegister, handleLogin, handleLogout }
}