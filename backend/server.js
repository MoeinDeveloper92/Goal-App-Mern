const express = require("express")
const path = require("path")
const colors = require("colors")
const connectDB = require("./config/db")
const dotenv = require("dotenv").config()
const { errorHandler } = require("./middleware/errorMiddleware")
const PORT = process.env.PORT || 5000

connectDB()
const app = express()
//in order to use body data we need to have bpody parse
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.use("/api/goals", require("./routes/goalRoutes"))
app.use("/api/users", require("./routes/userRoutes"))
//below code overrides express error handler

//Serve Frontend
if (process.env.NODE_ENV === 'production') {
    //ser our static folder
    app.use(express.static(path.join(__dirname, "../frontend/build")))
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "../", "frontend", "build", "index.html"))
    })
} else {
    app.get("/", (req, res) => {
        res.send("Please set to production")
    })
}
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`The server is Ready to work on port ${PORT} and we are in ${process.env.NODE_ENV} mode`)
})