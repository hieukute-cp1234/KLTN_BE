import express from "express";
import { sopportController } from "../controllers/index.js";
import { handleUploadfile } from "../helpers/index.js";
const router = express.Router();

router.get("/random-id", sopportController.getRandomId);
router.post(
  "/upload-multiple",
  handleUploadfile.array("files"),
  sopportController.uploadFiles
);

export default router;
