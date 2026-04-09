import express from "express"
import cookieParser from "cookie-parser"
import morgan from "morgan"

const app = express()

app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

app.get("/", (req, res) => {
    res.status(200).json({
        message: "server is running"
    })
})

export default app



