import express from "express"
import { getBanks, getBank, createBank, deleteBank, updateBank,changeMoney } from "../controllers/Bank"
import { authRequired } from "../middleware/authMiddleware"

const router = express.Router()

router.get(("/"), authRequired, getBanks)

router.get(("/:id"), authRequired,getBank)

router.post(("/"),  authRequired,createBank)

router.delete(("/:id"), authRequired,deleteBank)

router.put(("/:id"),  authRequired,updateBank)

router.get(("/money"), authRequired,changeMoney)


export default router