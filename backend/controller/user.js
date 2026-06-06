// فرض کریں ہم MongoDB استعمال کر رہے ہیں (mongoose)
import User from "../models/userModel.js"; // user model import کریں

export const createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // سادہ validation
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "تمام فیلڈز ضروری ہیں" });
    }

    // چیک کریں کہ یوزر پہلے سے موجود نہ ہو
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "یہ ای میل پہلے سے موجود ہے" });
    }

    // یوزر بنائیں
    const user = await User.create({ name, email, password });

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user,
    });
  } catch (error) {
    next(error); 
  }
};
