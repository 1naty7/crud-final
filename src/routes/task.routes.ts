import express from "express"
import { getTasks, createTask, deleteTask, updateTask } from "../controllers/task.controller"
import { authRequired } from "../middleware/authMiddleware"

const router = express.Router()

router.get(("/getTasks"), authRequired, getTasks)

router.post(("/createTask"),  authRequired,createTask)

router.delete(("/deleteTask/:id"), authRequired,deleteTask)

router.put(("/updateTask/:id"),  authRequired,updateTask)


export default router