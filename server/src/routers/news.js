import { Router } from "express";
import { fetchNews } from "../controllers/news.js";

const router = Router();

router.get("/", fetchNews);

export { router as newsRouter };