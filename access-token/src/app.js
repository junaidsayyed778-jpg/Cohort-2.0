const cookieParser = require("cookie-parser");
const express = require("express");
const authRoutes = require("./routes/authRoute");
const morgan = require("morgan");
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(morgan("dev"))

app.use("/api/auth", authRoutes);

module.exports = app;
