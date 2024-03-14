import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";

const app = express();
const PORT = process.env.PORT;

// Mounting middleware functions and routes
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

mongoose.connect(process.env.MONGO_URI || "")
.then(() => {
    console.log(`Connected to mongodb! Server running on PORT ${PORT}`);
})
.catch(err => console.log(err));

