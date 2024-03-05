import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import { authRouter } from "./routers/auth.js";
import { newsRouter } from "./routers/news.js";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use("/auth", authRouter);
app.use("/news", newsRouter);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Connected to mongodb! Server running on PORT ${PORT}`);
        })
    })
    .catch(err => console.log(err));