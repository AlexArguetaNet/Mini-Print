import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import { authRouter } from "./routes/auth";

const app = express();
const PORT = process.env.PORT;

// Mounting middleware functions and routes
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use("/auth", authRouter);

mongoose.connect(process.env.MONGO_URI || "")
.then(() => {
    app.listen(PORT, () => {
        console.log(`Connected to mongodb! Server running on PORT ${PORT}`);
    });
})
.catch(err => console.log(err));

