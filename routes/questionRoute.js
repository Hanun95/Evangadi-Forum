import express from "express";
import {
  getQuestions,
  getQuestion,
  postQuestion,
} from "../controllers/questionController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getQuestions);
router.get("/:questionId", authMiddleware, getQuestion);
router.post("/", authMiddleware, postQuestion);

export default router;
