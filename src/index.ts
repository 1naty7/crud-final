import express from "express"
import cors  from "cors"
import QuizRouter from "./routes/Quizes"
import StorageRouter from "./routes/Storage"
import UserRouter from "./routes/Users"
import BankRouter from "./routes/Bank"
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + '/.env' });

import { dbConnect } from "./utils/handleDBConnect"
import apiRoutes from "./routes/index"
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static("storage"))
app.use('/storage', express.static(__dirname + '/storage'));
const PORT = 3000
const PUBLIC_URL = process.env.PUBLIC_URL

app.use("/api", apiRoutes)

dbConnect()

app.listen(PORT, () => {
    console.log(PUBLIC_URL)
    console.log("PORT")
})

