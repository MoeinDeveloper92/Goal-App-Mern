const jwt = require("jsonwebtoken")
const User = require("../models/userModel")
const asyncHandler = require("express-async-handler")

const protect = asyncHandler(async (req, res, next) => {
    let token;
    //in the req.headers.authorizatin we have token and we can have access to this if it is included
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
        //now we need to take out the token
        try {
            token = req.headers.authorization.split(" ")[1]
            //verify the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            //Get user from the token
            req.user = await User.findById(decoded.id).select("-password")

            next()
        } catch (error) {
            console.log(error)
            //401 is unauthorized
            res.status(401)
            throw new Error("Not Authorized")
        }


    }

    if (!token) {
        res.status(401)
        throw new Error("Not Authorized, No Token ")
    }


})



module.exports = protect