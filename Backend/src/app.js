// server ka instance create karenge and write all the routes here  

const express = require("express")
const cookieParser = require("cookie-parser")
const app = express()                   // creating our server 
const cors = require("cors")

app.use(express.json())        // basic middleware : jo req.body mein data ko allow kerta h read kerne ke liye 
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials: true
}))

/* require all the routes here */
const authRouter = require("./routes/auth.routes")
const interviewRouter = require("./routes/interview.routes")

/* using all the routes here */
app.use("/api/auth", authRouter)          // agar aapko auth related jinti bhi routes use kerne h toh unke aage prefix lagana hoga "/api/auth"
app.use("/api/interview", interviewRouter)


module.exports = app