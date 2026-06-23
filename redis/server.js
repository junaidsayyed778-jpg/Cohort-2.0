import "dotenv/config";
import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import Redis from "ioredis";
import { User } from "./models/userModel.js";
import ratelimit from "express-rate-limit";
import ejs from "ejs";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js"
const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser())

// ejs Template Engine Setup
app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.static("public"));

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB", error);
    }
};

connectToMongoDB();

const redis = new Redis(process.env.REDIS_URL);

redis.once("ready", () => {
    console.log("Connecting to Redis");
});

const globalLimiter = ratelimit({
    windowMs: 1 * 60 * 1000,
    max: 100,
    message: {
        error: "Too many requests, Please try again later.",
    },
    statusCode: 429,
    standardHeaders: true,
    legacyHeaders: false,
});

app.use(userRoutes)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
