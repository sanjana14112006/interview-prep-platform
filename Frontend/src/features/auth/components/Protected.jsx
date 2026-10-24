// src/features/auth/components/Protected.jsx --> (Route Guard)
// Role: Security guard for private pages (like Home/Dashboard).
// How it works: It checks useAuth(). If loading is true, it displays Loading.... If there is no user (not logged in), it redirects to /login using <Navigate to="{'/login'}"/>. If the user exists, it renders {children} (the protected page).


import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router"; 


const Protected = ({children}) => {
    const { loading, user } = useAuth()

    if(loading) {
        return (<main><h1>Loading.......</h1></main>)
    }

    if(!user) {
        return <Navigate to={'/login'} />
    }

    return children
}

export default Protected