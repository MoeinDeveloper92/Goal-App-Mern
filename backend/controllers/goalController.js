const Goal = require("../models/goalModel")
const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")

//@desc     Get Goals
//@route    GET /api/goals 
//@access   public
const getGoals = asyncHandler(async (req, res, next) => {
    const goals = await Goal.find({ user: req.user.id })
    res.status(200).json(goals)
})


//@desc     Creat new goal
//@route    POST /api/goals
//@access   Private
const setGoal = asyncHandler(async (req, res, next) => {

    if (!req.body.text) {
        //it is cionsidered as bad request
        res.status(400)
        throw new Error("Please add a text field")
    }
    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id
    })
    res.status(200).json(goal)
})


//@desc     Update goal
//@route    PUT /api/goals/:id
//@access   Private
const updateGoal = asyncHandler(async (req, res, next) => {
    //get the goal that we are trying to update
    const goal = await Goal.findById(req.params.id)

    if (!goal) {
        res.status(400)
        throw new Error("Goal not found")
    }
    const user = await User.findById(req.user.id)
    //check for user
    if (!user) {
        res.status(401)
        throw new Error("User not found")
    }
    //Make sure the logged in user matches the goal user
    if (goal.user.toString() !== user.id) {
        res.status(401)
        throw new Error("User not authorized")
    }
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })
    res.status(200).json(updatedGoal)
})



//@desc     Delete goal
//@route    DELETE /api/goals/:id
//@access   private
const deleteGoal = asyncHandler(async (req, res, next) => {
    //first we need to check for the goal 
    const goal = await Goal.findById(req.params.id)

    if (!goal) {
        res.status(400)
        throw new Error("Goal not found")
    }
    const user = await User.findById(req.user.id)
    //check for user
    if (!user) {
        res.status(401)
        throw new Error("User not found")
    }

    //Make sure the logged in user matches the goal user
    if (goal.user.toString() !== user.id) {
        res.status(401)
        throw new Error("User not authorized")
    }
    await Goal.findByIdAndDelete(req.params.id)

    res.status(200).json({
        id: req.params.id,
        msg: "Deleted successfully"
    })
})

module.exports = {
    getGoals,
    setGoal,
    deleteGoal,
    updateGoal
}