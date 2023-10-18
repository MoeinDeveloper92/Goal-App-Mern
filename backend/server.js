const express = require("express")
const dotenv = require("dotenv").config()
const { errorHandler } = require("./middleware/errorMiddleware")
const PORT = process.env.PORT || 5000


const app = express()
//in order to use body data we need to have bpody parse
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.use("/api/goals", require("./routes/goalRoutes"))
//below code overrides express error handler
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`The server is Ready to work on port ${PORT} and we are in ${process.env.NODE_ENV} mode`)
})