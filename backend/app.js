const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");

if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: path.join(__dirname, "config", ".env"),
  });
}

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // Vite frontend
    credentials: true,
  })
);

// middlewares
app.use(express.json({ limit: "20mb" }));
app.use(cookieParser());

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use(bodyParser.urlencoded({ extended: true, limit: "20mb" }));

// routes
const userRouter = require("./routes/user");
const shopRouter = require("./controller/shop");
const productRouter = require("./controller/product");
const eventRouter = require("./controller/event");
const couponRouter = require("./controller/coupounCode");
app.use("/api/v2/user", userRouter);
app.use("/api/v2/shop", shopRouter);
app.use("/api/v2/product", productRouter);
app.use("/api/v2/event", eventRouter);
app.use("/api/v2/coupon", couponRouter);
// error middleware
const errorMiddleware = require("./middleware/error");
app.use(errorMiddleware);

module.exports = app;
