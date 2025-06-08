import express from "express"
const app = express()

import cookieParser from "cookie-parser"
import errorMiddleWare from "./middleware/error.js"
import bodyParser from "body-parser"

app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))

// route imports
import user from "./routes/userRoute.js"

import books from "./routes/bookRoutes.js"
app.use("/api/v1", user)
app.use("/api/v1", books)

app.use(errorMiddleWare)

export default app