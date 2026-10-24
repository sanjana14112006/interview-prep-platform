// this file shows how a user defined :
const mongoose = require("mongoose")      // Mongoose library laye schema banane ke liye.


const userSchema = new mongoose.Schema({         // Naya user database ka structure define kiya.
    username: {            // String type ka username hoga, unique hona zaroori hai aur blank nahi chhod sakte.
        type: String,
        unique: [ true, "username already taken" ],
        required: true,
    },

    email: {                  // User ki unique email store hogi jisse duplicate account na bane.
        type: String,
        unique: [true, "Account already exists with this email address"],
        required: true,
    },

    password: {           // User ka encrypted password store karne ke liye field.
        type: String,
        required: true
    }
})


const userModel = mongoose.model("users", userSchema)                     //Mongoose ko bola ki users naam ka collection banao is schema ke base par.   // there is a method in this mongoose package called modal (isse hum bta rhe hote h ki user ka data kis collection ke ander store hora hoga (toh "users" name ka collection hoga toh uske ander hamara data store hora hoga and the  schema is "userSchema"))

module.exports = userModel           // Model ko export kiya taaki controller me user create/find kar sakein.