// this file is for all the routes related to the authentication

const { Router } = require('express')
const authControllers = require("../controllers/auth.controllers")
const authRouter = Router()
const jwt = require("jsonwebtoken")
const authMiddleware = require("../middlewares/auth.middleware")

/**
 * @route POST/api/auth/register
 * @description register a new user
 * @access Public
 */

authRouter.post("/register", authControllers.registerUserController)

/**
 * @route POST/api/auth/login
 * @description login user email and password
 * @access Public
 */
authRouter.post("/login", authControllers.loginUserController)

/**
 * @route GET/api/auth/logout
 * @description clear token from user cookie and add the token in blacklist
 * @access Public
 */
authRouter.get("/logout", authControllers.logoutUserController)

/**
 * @route GET/api/auth/get-me
 * @description get the current logged in user details
 * @access private
 */
authRouter.get("/get-me", authMiddleware.authUser, authControllers.getMeController)


module.exports = authRouter