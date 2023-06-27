import Express from "express";
import { Router } from "express";
import controllers from "../controllers";


const router = Router()

// crear un usuario
router.post("/createEvent", controllers.Event.createEvent);
router.get("/getEvent", controllers.Event.getEvent)
router.put("/updateEvent", controllers.Event.updateEvent)
router.delete("/deleteEvent/:_id", controllers.Event.deleteEvent) // quuery params

export default router