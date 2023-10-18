// basically each resource in the API has its own route and unique endpoints
const express = require("express")
const router = express.Router()

const { getGoals, setGoal, updateGoal, deleteGoal } = require("../controllers/goalController")

router.route("/").get(getGoals).post(setGoal)
router.route("/:id").put(updateGoal).delete(deleteGoal)




module.exports = router