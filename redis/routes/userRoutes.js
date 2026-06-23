import express from "express";

const router = express.Router()

router.get("/user/:id", async (req, res) => {
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

router.post("/user", async (req, res) => {
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

router.get("/", async (req, res) => {
    res.render("index", {
        username: "Cohort User",
        bio: "This is a sample bio for the user",
        profilePicture: "https://plus.unsplash.com/premium_photo-1690407617542-2f210cf20d7e?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZmlsZSUyMHBob3RvfGVufDB8fDB8fHww"
    });
});

export default router