const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// CREATE USER
const createuser = async (req, res) => {
  try {
    const {
      name,
      email,
      mobileNumber,
      role,
      password,
    } = req.body;

    if (!name || !email || !mobileNumber || !password) {
      return res.status(400).json({
        success: false,
        message:
          "Name, Email, Mobile Number and Password are required",
      });
    }

    const existingUser = await User.findOne({
      $or: [
        { email },
        { mobileNumber },
      ],
    });

    if (existingUser) {
      if (existingUser.email === email) {
        return res.status(400).json({
          success: false,
          message: "Email already exists",
        });
      }

      return res.status(400).json({
        success: false,
        message: "Mobile Number already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    const user = await User.create({
      name,
      email,
      mobileNumber,
      role: role || "user",
      password: hashedPassword,
    });

    const token = jwt.sign(
      {
        userId: user.userId,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    return res.status(200).json({
      success: true,
      message: "User created successfully",
      token,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ALL USERS
const getusers = async (req, res) => {
  try {
    const users = await User.find().sort({
      userId: 1,
    });

    return res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createuser,
  getusers,
};