import { Router } from "express"
import User from "./Users"
import Storage from "./Storage"
import Bank from "./Bank"
import Quizes from "./Quizes"
import Transaction from "./Transaction"

const router = Router()

router.use(("/quiz"), Quizes)
router.use(("/storage"), Storage)
router.use(("/user"), User)
router.use(("/bank"), Bank)
router.use(("/transaction"), Transaction)

export default router