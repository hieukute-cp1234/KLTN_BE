import express from "express";
import { userController } from "../controllers/index.js";
import { authorization } from "../middlewares/auth.js";

const router = express.Router();

router.get("/user", authorization, userController.fetchAllUser);
router.get("/user/:id", authorization, userController.fetchUserById);
router.get("/me", authorization, userController.fetchMe);

export default router;
