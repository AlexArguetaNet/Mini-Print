import { Router } from "express";
import { fetchNews } from "../controllers/news";

const router = Router();

router.get("/", fetchNews);

export { router as newsRouter };