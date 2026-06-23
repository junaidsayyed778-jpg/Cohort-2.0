import "dotenv/config";
import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import Redis from "ioredis";
import { User } from "./models/userModel.js";
import ratelimit from "express-rate-limit";
import ejs from "ejs";

const app = express();
app.use(morgan("dev"));
app.use(express.json());

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

app.get("/user/:id", async (req, res) => {
    try {
        const userFromCache = await redis.get(`user:${req.params.id}`);
        if (userFromCache) {
            return res.json({
                message: "User fetched from cache",
                data: JSON.parse(userFromCache),
            });
        }

        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        await redis.set(`user:${req.params.id}`, JSON.stringify(user), "EX", 3600); // cache for 1 hour

        res.json({
            message: "User Fetched successfully",
            data: user,
        });
    } catch (error) {
        res.status(500).json({ error: "Error fetching users" });
    }
});

app.post("/user", async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.json({
            message: "User created successfully",
            data: newUser,
        });
    } catch (err) {
        res.status(500).json({
            error: "Error creating user",
        });
    }
});

app.get("/", async (req, res) => {
    res.render("index", {
        username: "Cohort User",
        bio: "This is a sample bio for the user",
        profilePicture: "https://plus.unsplash.com/premium_photo-1690407617542-2f210cf20d7e?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZmlsZSUyMHBob3RvfGVufDB8fDB8fHww"
    });
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
