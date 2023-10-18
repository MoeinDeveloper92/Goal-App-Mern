// basically each resource in the API has its own route and unique endpoints
const express = require("express")
const protect = require("../middleware/authMiddleware")
const router = express.Router()

const { getGoals, setGoal, updateGoal, deleteGoal } = require("../controllers/goalController")

router.route("/").get(protect, getGoals).post(protect, setGoal)
router.route("/:id").put(protect, updateGoal).delete(protect, deleteGoal)




module.exports = router