import "dotenv/config";
import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import Redis from "ioredis";
import { User } from "./models/userModel.js";

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

const app = express();
app.use(morgan("dev"));
app.use(express.json());

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
