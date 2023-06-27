import { Router } from "express"
import User from "./Users"
import Storage from "./Storage"
import Bank from "./Bank"
import Quizes from "./Quizes"
import Tasks from "./task.routes"
import Transaction from "./Transaction"
import Event from "./event.routes"

const router = Router()

router.use(("/quiz"), Quizes)
router.use(("/storage"), Storage)
router.use(("/user"), User)
router.use(("/bank"), Bank)
router.use(("/task"), Tasks)
router.use(("/transaction"), Transaction)
router.use("/event", Event);

export default router