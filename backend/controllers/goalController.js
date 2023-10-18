const asyncHandler = require("express-async-handler")
//@desc     Get Goals
//@route    GET /api/goals
//@access   public
const getGoals = asyncHandler(async (req, res, next) => {
    res.status(200).json({
        msg: "Get all goals"
    })
}
)


//@desc     Creat new goal
//@route    POST /api/goals
//@access   Private
const setGoal = asyncHandler(async (req, res, next) => {
    if (!req.body.text) {
        //it is cionsidered as bad request
        res.status(400)
        throw new Error("Please add a text field")
    }
    res.status(200).json({
        msg: "Create Goal"
    })
})


//@desc     Update goal
//@route    PUT /api/goals/:id
//@access   Private
const updateGoal = asyncHandler(async (req, res, next) => {
    res.status(200).json({
        msg: `Update goals with id ${req.params.id}`
    })
})

//@desc     Delete goal
//@route    DELETE /api/goals/:id
//@access   private
const deleteGoal = asyncHandler(async (req, res, next) => {
    res.status(200).json({
        msg: `Delete goal with id ${req.params.id}`
    })
})

module.exports = {
    getGoals,
    setGoal,
    deleteGoal,
    updateGoal
}