import { Router } from "express";
import { addArticle, getUserArticles, deleteArticle } from "../controllers/user"; 

const router = Router();

router.post("/add-article", addArticle);
router.get("/get-user-articles", getUserArticles);
router.delete("/delete", deleteArticle);

export { router as userRouter };