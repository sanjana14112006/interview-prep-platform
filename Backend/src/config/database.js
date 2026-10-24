// this file connects our express server to the mongo database :
const mongoose = require("mongoose")       // MongoDB ke sath queries run karne ke liye Mongoose library import ki.
const dns = require("node:dns")         // Node.js ka built-in DNS module mangwaya.
 

// Force Node.js to use Google DNS for all resolutions (including SRV)
dns.setServers(["8.8.8.8", "8.8.4.4"])            // Google ke public DNS set kiye taaki MongoDB Atlas ke mongodb+srv:// connection me domain resolution error na aaye.


async function connectToDB() {      // Database connect karne ke liye asynchronous function banaya.

    try {
        await mongoose.connect(process.env.MONGO_URI)           // .env file se connection string lekar DB se connect kiya.
        console.log("Connect to Database")
    }
    catch (err) {
        console.log(err)                   // Agar connect hone me fail hua toh error console par print ho jaye.
    }
}

module.exports = connectToDB             // Is function ko export kiya taaki server.js ise run kar sake.