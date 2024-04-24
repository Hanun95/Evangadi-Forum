import express from "express";
import { register, login, checkUser } from "../controllers/userController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/check", checkUser);

export default router;
