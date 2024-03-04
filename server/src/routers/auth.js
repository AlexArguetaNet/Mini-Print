import { Router } from "express";
import { signUp, login } from "../controllers/auth.js";

const router = Router();

router.post("/sign-up", signUp);
router.post("/login", login);

export { router as authRouter };