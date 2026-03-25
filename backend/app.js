const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");

if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "./backend/config/.env",
  });
}

const app = express();

// middlewares
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173", // Vite frontend
    credentials: true,
  })
);

app.use("/uploads", express.static("uploads"));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

// routes
const userRouter = require("./routes/user");
app.use("/api/v2/user", userRouter);

// error middleware
const errorMiddleware = require("./middleware/error");
app.use(errorMiddleware);

module.exports = app;
