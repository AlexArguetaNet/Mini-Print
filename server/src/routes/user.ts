import { Router } from "express";
import { addArticle } from "../controllers/user"; 

const router = Router();

router.post("/add-article", addArticle);

export { router as userRouter };