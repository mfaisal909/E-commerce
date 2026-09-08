const express = require("express");
const path = require("path");
const jwt = require("jsonwebtoken");
const User = require("../model/user");
const { upload } = require("../multer");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendMail = require("../utils/sendMail");

const router = express.Router();

// ==================== CREATE USER ====================
router.post(
  "/create-user",
  upload.single("file"),
  catchAsyncErrors(async (req, res, next) => {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      return next(new ErrorHandler("Please fill all fields", 400));
    }

    if (!req.file) {
      return next(new ErrorHandler("Please upload an avatar image", 400));
    }

    // Check if user exists
    const userEmail = await User.findOne({ email });
    if (userEmail) {
      return next(new ErrorHandler("User already exists", 400));
    }

    // Create user
    const filename = req.file.filename;
    const fileUrl = path.join("uploads", filename);

    const user = await User.create({
      name,
      email,
      password,
      avatar: fileUrl,
    });

    const activationToken = jwt.sign(
      { id: user._id },
      process.env.ACTIVATION_SECRET,
      { expiresIn: "1d" }
    );

    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    const activationUrl = `${frontendUrl}/activation/${activationToken}`;
    const message = `Hello ${user.name},\n\nPlease verify your email by clicking the link below:\n\n${activationUrl}\n\nIf you did not sign up, please ignore this email.`;

    let emailSent = true;
    try {
      await sendMail({
        email: user.email,
        subject: "Activate your account",
        message,
      });
    } catch (mailError) {
      console.error("Email send failed:", mailError);
      emailSent = false;
    }

    res.status(201).json({
      success: true,
      message: emailSent
        ? "User created successfully. Verification email sent."
        : "User created successfully, but verification email could not be sent.",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
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

router.post(
  "/activation",
  catchAsyncErrors(async (req, res, next) => {
    const { activation_token } = req.body;

    if (!activation_token) {
      return next(new ErrorHandler("Activation token is required", 400));
    }

    let decoded;
    try {
      decoded = jwt.verify(activation_token, process.env.ACTIVATION_SECRET);
    } catch (error) {
      return next(new ErrorHandler("Invalid or expired activation token", 400));
    }

    const user = await User.findById(decoded.id);
    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    if (user.isVerified) {
      return res.status(200).json({
        success: true,
        message: "User already verified",
      });
    }

    user.isVerified = true;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Account verified successfully",
    });
  })
);

// ==================== SEND MESSAGE TO SHOP ====================
router.post(
  "/send-message",
  catchAsyncErrors(async (req, res, next) => {
    const { email, subject, message } = req.body;

    if (!email || !subject || !message) {
      return next(new ErrorHandler("Email, subject, and message are required", 400));
    }

    await sendMail({
      email,
      subject,
      message,
    });

    res.status(200).json({
      success: true,
      message: "Message sent successfully.",
    });
  })
);

module.exports = router;
