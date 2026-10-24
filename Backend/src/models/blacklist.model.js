// (Logout Token Store)
// this file is for the blacklisting the token (at the time of logout ) :
const mongoose = require('mongoose')

const blacklistTokenSchema = new mongoose.Schema({       // Logged-out tokens ko temporarily store karne ka format.
    token: {             // Wo JWT string jo user ne logout ke time submit kiya.
        type: String,
        required: [ true, "token is required to be added in blacklist"]
    }
}, {
    timestamps: true             // Token kab blacklist hua uska createdAt aur updatedAt time automatic save ho.
})

const tokenBlacklistModel = mongoose.model("blacklistTokens",blacklistTokenSchema)   // Collection model create kiya.

module.exports = tokenBlacklistModel          // Blacklist model export kiya.