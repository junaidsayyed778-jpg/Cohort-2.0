const cookieParser = require("cookie-parser");
const express = require("express");
const authRoutes = require("./routes/authRoute");
const morgan = require("morgan");
const cors = require("cors")
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/auth", authRoutes);

module.exports = app;
