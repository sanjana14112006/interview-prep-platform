// how your frontend communicate to the backend apis

// src/features/auth/services/auth.api.js --> (API Network Layer)
// Role: Central Axios instance configured with baseURL and withCredentials: true to handle HTTP requests (POST /login, POST /register, GET /logout, GET /get-me) and cookie exchange.
// terminal --> npm i axios
// axios --> backend API endpoints ko HTTP requests (GET, POST, PUT, DELETE) bhejne ke liye aur response/data receive karne ke liye

// this file is for : authentication ke saare API network requests (register, login, logout, getMe) ko handle karne ke liye ek central file jaha custom axios instance banaya gaya hai.
import axios from "axios"                        // HTTP requests bhejne ke liye Axios library mangwayi.

// repeated credentials ko isse replace ker skte h (code clean rkhta h)
const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true
})

// register function --> frontend se user ka data (username, email, password) lekar axios.post ke through backend endpoint (/api/auth/register) pe bhejta hai.
// withCredentials: true --> backend se aane wali cookie/token ko frontend me accept aur store karne ke liye zaroori hai.
// return response.data --> backend se jo success message aur user details aati hain, use frontend component ko return karta hai.


// ye 4 functions humne jo neechee bnaye h ye backend se interact karenge :


// Naye user ka registration data lekar backend (/api/auth/register) par bhejta hai. Backend account banata hai aur browser ko token cookie bhejta hai.
export async function register({ username, email, password }) {
    try {
        const response = await api.post('/api/auth/register', {
            username, email, password
        })

        return response.data

    } catch (err) {
        console.log(err)
    }
}

// Existing user ka email aur password backend (/api/auth/login) par verify karne bhejta hai. Valid hone par login successful karta hai.
export async function login ({ email, password }) {
    try {
        const response = await api.post('/api/auth/login', {
            email, password
        })

        return response.data

    } catch (err) {
        console.log(err)
    }
}

// Backend (/api/auth/logout) ko call karta hai taaki server auth token ko blacklist kar sake aur browser se session cookie clear ho jaye.
export async function logout(){
    try {
        const response = await api.get('/api/auth/logout')

        return response.data
    } catch (err) {
        console.log(err)
    }
}

// Jab user page refresh karta hai, ye function backend (/api/auth/get-me ya /profile) ko call karke check karta hai ki user pehle se logged-in hai ya nahi, aur current user ka profile data wapas laata hai.
export async function getMe(){
    try {
        const response = await api.get('/api/auth/get-me')

        return response.data
    } catch (err) {
        console.log(err)
    }
}
