import express from "express";
import { sopportController } from "../controllers/index.js";
const router = express.Router();

router.get("/random-id", sopportController.getRandomId);

export default router;
