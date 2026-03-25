const express = require("express");
const path = require("path");
const User = require("../model/user");
const { upload } = require("../multer");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

const router = express.Router();

// ==================== CREATE USER ====================
router.post(
  "/create-user",
  upload.single("file"),
  catchAsyncErrors(async (req, res, next) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return next(new ErrorHandler("Please fill all fields", 400));
    }

    const userEmail = await User.findOne({ email });

    if (userEmail) {
      return next(new ErrorHandler("User already exists", 400));
    }

    if (!req.file) {
      return next(new ErrorHandler("Please upload an avatar image", 400));
    }

    const filename = req.file.filename;
    const fileUrl = path.join("uploads", filename);

    const user = await User.create({
      name,
      email,
      password,
      avatar: fileUrl,
    });

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user,
    });
  })
);

// ==================== LOGIN USER ====================
router.post(
  "/login-user",
  catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new ErrorHandler("Please enter email and password", 400));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return next(new ErrorHandler("Invalid email or password", 401));
    }

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
    });
  })
);

// ==================== GET USER ====================
router.get(
  "/getuser",
  catchAsyncErrors(async (req, res, next) => {
    // demo purpose: first user return کر رہا ہے
    const user = await User.findOne();

    if (!user) {
      return next(new ErrorHandler("No user found", 404));
    }

    res.status(200).json({
      success: true,
      user,
    });
  })
);

module.exports = router;
