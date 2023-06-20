import express from "express";
import { projectController } from "../controllers/index.js";
import { authorization } from "../middlewares/auth.js";

const router = express.Router();

router.get("/project", authorization, projectController.fetchAllProject);
router.get("/project/:id", authorization, projectController.fetchProjectById);
router.post("/project", authorization, projectController.createProject);
router.put("/project/:id", authorization, projectController.updateProject);
router.delete("/project/:id", authorization, projectController.deleteProject);
router.get("/project-user", authorization, projectController.fetchProjectByUSer);

export default router;
