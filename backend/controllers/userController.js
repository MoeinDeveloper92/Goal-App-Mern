const bcrybtjs = require("bcryptjs")
const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")
const generateToken = require("../authentication/generateToken")


//@desc     Register new user
//@route    POST /api/users
//@access   Public=> you cannot access a protected routes withought being registered
const registerUser = asyncHandler(async (req, res, next) => {
    //whenwe send req to this route we will have body data and we need to destrcute them
    const { name, email, password } = req.body
    if (!name || !email || !password) {
        res.status(400)
        throw new Error("Please add all fields")
    }

    //Check if user exist
    const userExist = await User.findOne({ email })

    if (userExist) {
        res.status(400)
        throw new Error("User Already Exist.")
    }

    //here we need to hash the password
    //1: we need to salt the password
    const salt = await bcrybtjs.genSalt(10)
    const hashedPassword = await bcrybtjs.hash(password, salt)

    //Create the user
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    //if the user created
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error("Invalid user data")
    }

})


//@desc     Authenticate a user
//@route    POST/api/users/login
//@access   Public
const loginUser = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body

    //cehck fot user email
    const user = await User.findOne({ email })

    if (user && (await bcrybtjs.compare(password, user.password))) {
        //if theses two conditions turns out we proceed to...
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error("Invalid Credentials")
    }
})


//@desc     Get user data
//@route    POST /api/users/me
//@access   Private
const getMe = asyncHandler(async (req, res, next) => {

    res.status(200).json(req.user)
})


module.exports = {
    registerUser,
    loginUser,
    getMe
}