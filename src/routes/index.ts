import { Router } from "express"
import User from "./Users"
import Storage from "./Storage"
import Bank from "./Bank"
import Quizes from "./Quizes"

const router = Router()

router.use(("quiz"), Quizes)
router.use(("storage"), Storage)
router.use(("user"), User)
router.use(("bank"), Bank)

export default router