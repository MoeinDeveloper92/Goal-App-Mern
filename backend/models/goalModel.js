const mongoose = require("mongoose")

// With every goal we need to know which user created it,
const goalSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    text: {
        type: String,
        required: [true, "Please add a text value"]
    }
}, {
    timestamps: true
})

const Goal = mongoose.model("Goal", goalSchema)

module.exports = Goal