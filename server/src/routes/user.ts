import { Router } from "express";
import { addArticle, getUserArticles } from "../controllers/user"; 

const router = Router();

router.post("/add-article", addArticle);
router.get("/get-user-articles", getUserArticles);

export { router as userRouter };