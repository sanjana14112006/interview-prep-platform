// User ka data jo hume frontend pe dikhana h usse kahi toh store kerna hoga.
// src/features/auth/auth.context.jsx --> (Global State Layer)
// Role: Holds the global user and loading state using React Context API so any component can access auth details without prop drilling.
// Yeh code React ke Context API ka use karke ek Global State Store bana raha hai. Iska main kaam ye hai ki logged-in user ki details aur loading state ko app ke kisi bhi component (Navbar, Profile, Dashboard, etc.) me bina baar-baar props pass kiye direct use karne diya ja sake.
import { createContext, useState } from "react";
import { getMe } from "./services/auth.api";


export const AuthContext = createContext()            // Ek naya Context box create karta hai jisme hum auth se related data store karenge.

export const AuthProvider = ({ children }) => {       // Ek wrapper component hai jo pure app ko (ya uske child components ko) apne andar lapet (wrap) leta hai. Iske andar jo bhi components aayenge, wo { children } kehlayenge.

    const [user, setUser] = useState(null)            // Current logged-in user ki profile information (jaise username, email, _id) store karta hai. Shuru me user login nahi hota, isliye default value null hai.
    const [loading, setLoading] = useState(true)     // Track karta hai ki backend se user ka data fetch ho raha hai ya nahi (e.g. login/register/logout request ke time loader/spinner dikhane ke liye).


    return (
        <AuthContext.Provider value={{user,setUser,loading,setLoading}}>
            {children}
        </AuthContext.Provider>
    )
}



// Socho AuthContext.Provider ek Wi-Fi Router hai, aur value={{ user, setUser, loading, setLoading }} us router ka Internet Signal / Data hai.

// 1. <AuthContext.Provider loading, setLoading setUser, user, value="{{" }}>

// Ye kya karta hai: Ye ek broadcast machine (provider) banata hai.

// value={{ ... }} ka matlab: Aap is router me data pack dal rahe ho. Jo 4 cheezein aapne { user, setUser, loading, setLoading } yaha di hain, wo is Wi-Fi ke network me broadcast (share) hone lagti hain.

// Ab kisi bhi page ko user ka data chahiye, toh use seedha props ke raste bhejne ki zaroorat nahi hai, wo direct is Wi-Fi se connect hoke data nikal lega.

// 2. {children}

// children kya hai: Jo components is <AuthProvider> tag ke andar likhe jayenge (jaise <App/>, <Navbar/>, <Login/>, <Dashboard/>), React un sabko technical terms me children bolta hai.

// Kyu likhte hain: Agar aap {children} nahi likhoge, toh React un sabhi pages aur buttons ko screen pe draw (render) hi nahi karega. Screen blank aayegi.