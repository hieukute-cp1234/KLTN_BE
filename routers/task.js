import express from "express";
import { taskController } from "../controllers/index.js";
import { authorization } from "../middlewares/auth.js";

const router = express.Router();

router.get("/task", authorization, taskController.fetchTaskByUser);
router.get("/task/:id", authorization, taskController.fetchTaskById);
router.post("/task", authorization, taskController.createTask);
router.put("/task/:id", authorization, taskController.updateTask);
router.delete("/task/:id", authorization, taskController.deleteTask);
router.put("/status-task/:id", authorization, taskController.updateStatusTask);

export default router;
