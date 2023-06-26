import express from "express"
import { getBanks, getBank, createBank, deleteBank, updateBank} from "../controllers/Bank"
import { authRequired } from "../middleware/authMiddleware"

const router = express.Router()

router.get(("/"), authRequired, getBanks)

router.get(("/:id"), authRequired,getBank)

router.post(("/"),  authRequired,createBank)

router.delete(("/:id"), authRequired,deleteBank)

router.put(("/"),  authRequired,updateBank)

export default router