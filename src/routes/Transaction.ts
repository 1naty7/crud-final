import express from "express"
import { createTransaction, deleteTransaction, updateTransaction} from "../controllers/Transaction"
import { authRequired } from "../middleware/authMiddleware"

const router = express.Router()

router.post(("/"), authRequired, createTransaction)

router.delete(("/:id"), authRequired,deleteTransaction)

router.put(("/"), authRequired,updateTransaction)


export default router