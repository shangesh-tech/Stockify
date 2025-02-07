const User = require("../models/userModel");
const sendToken = require("../middleware/sendToken");
const bcrypt = require("bcryptjs");

// Hash password before saving the user
const hashPassword = async (password) => {
  return await bcrypt.hash(password, 12);
};

// Compare password
const comparePassword = async (enteredPassword, hashedPassword) => {
  return await bcrypt.compare(enteredPassword, hashedPassword);
};

// Register User
exports.registerUser = async (req, res) => {
  try {
    const { name, email, gender, password, age } = req.body;

    if (!email || !name || !password || !gender || !age) {
      return res.status(400).json({ error: "Please add all fields" });
    }

    if (
      !email.includes("@gmail") &&
      !email.includes("@yahoo") &&
      !email.includes("@outlook")
    ) {
      return res.status(400).json({ error: "Please enter a valid email address" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      name,
      email,
      gender,
      password: hashedPassword,
      age,
    });

    sendToken(user, 201, res);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Login User
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Please Enter Email And Password" });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await comparePassword(password, user.password))) {
      return res.status(401).json({ success: false, message: "Invalid Email or Password" });
    }

    sendToken(user, 201, res);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Logout User
exports.logoutUser = async (req, res) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });

    res.status(200).json({ success: true, message: "Logged Out" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get User Details
exports.getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update user profile
exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.gender = req.body.gender || user.gender;
    user.age = req.body.age || user.age;

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(req.body.password, salt);
    }

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      gender: updatedUser.gender,
      age: updatedUser.age,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
