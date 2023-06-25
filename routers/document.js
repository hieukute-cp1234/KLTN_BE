import express from "express";
import { documentController } from "../controllers/index.js";
import { handleUploadfile } from "../helpers/index.js";
const router = express.Router();

router.post(
  "/upload",
  handleUploadfile.single("file"),
  documentController.uploadFile
);
router.put(
  "/document/:id",
  handleUploadfile.single("file"),
  documentController.updateDocument
);
router.delete("/document/:id", documentController.deleteDocument);

export default router;
