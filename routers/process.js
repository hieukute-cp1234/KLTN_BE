import express from "express";
import { processController } from "../controllers/index.js";
import { authorization } from "../middlewares/auth.js";

const router = express.Router();

router.get("/process", authorization, processController.fetchAllProcess);
router.get("/process/:id", authorization, processController.fetchProcessById);
router.post("/process", authorization, processController.createProcess);
router.post("/process/:id", authorization, processController.copyProcess);
router.put("/process/:id", authorization, processController.updateProcess);
router.delete("/process/:id", authorization, processController.deleteProcess);

export default router;
