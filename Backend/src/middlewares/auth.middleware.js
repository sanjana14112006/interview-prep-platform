/// (Route Protection)

const jwt = require("jsonwebtoken")      // Token check aur verify karne ke liye library.

const tokenBlacklistModel = require("../models/blacklist.model")       // Blacklisted tokens ka DB model import kiya. 

async function authUser(req, res, next) {                  // Middleware function banaya jo protected routes se pehle chalega.
    const token = req.cookies.token            // Client ke cookie se token nikaala.

    if (!token) {
        return res.status(401).json({
            message: "Token not provided."
        })
    }

    const isTokenBlacklisted = await tokenBlacklistModel.findOne({
        token
    })

    if (isTokenBlacklisted) {
        return res.status(401).json({
            message: "Token is blacklisted. Please login again."
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        req.user = decoded
        next()

    } catch (err) {
        return res.status(401).json({
            message: "Invalid token."
        })
    }
}

module.exports = { authUser }