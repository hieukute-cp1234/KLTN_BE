import express from "express";
import { roleContoller } from "../controllers/index.js";
import { authorization } from "../middlewares/auth.js";

const router = express.Router();

router.get("/role", authorization, roleContoller.fetchAllRole);
router.post("/role", authorization, roleContoller.createRole);
router.put("/role/:id", authorization, roleContoller.updateRole);
router.delete("/role/:id", authorization, roleContoller.deleteRole);

export default router;
