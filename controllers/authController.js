var express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/Users");
const Role = require("../models/Role");
const passwordEncrypt = require("../utils/passwordEncrypt");
const { validateOnRegister, validateOnLogin } = require("../utils/validation");
const bcrypt = require("bcryptjs");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const validation = {
  register: validateOnRegister,
  login: validateOnLogin,
};
const handleValidation = (body, type) => {
  const { error } = validation[type](body);
  if (error) {
    return error.details[0].message;
  }
};
const registerUser = async (req, res) => {
  // Validate data before creating a user
  try {
    const validate = await handleValidation(req.body, "register");

    if (validate) {
      return res.status(400).json({
        error: true,
        msg: validate,
      });
    }
    //   Checking if the user is already in the db
    const emailExist = await User.findOne({ email: req.body.email });

    if (emailExist) {
      return res.status(400).json({
        error: true,
        msg: "E-Mail already exists",
      });
    }
    // check if the role is already in the db
    const roleExist = await Role.findOne({ name: req.body.role });

    if (!roleExist) {
      return res.status(400).json({
        error: true,
        msg: "Invalid Role",
      });
    }

    //   Hash password
    req.body.password = await passwordEncrypt(req.body.password);

    // Create a new user
    req.body.isActive = true; // temporarily
    req.body.isVerified = true; // temporarily

    req.body.role = roleExist._id;

    const user = new User(req.body);
    const savedUser = await user.save();

    res.status(201).json({
      error: false,
      msg: "User created successfully",
    });
  } catch (err) {
    console.log({
      err,
    });
    return res.status(400).json({
      error: true,
      msg: err.message,
    });
  }
};
const loginUser = async (req, res) => {
  const validate = await handleValidation(req.body, "login");
  if (!validate) {
    return res.status(400).json({
      error: true,
      msg: validate,
    });
  }
  try {
    //   Checking if the user is already in the db
    const user = await User.findOne({ email: req.body.email }).select(
      "+password"
    );
    if (!req.body.role) {
      return res.status(400).json({
        error: true,
        message: "role is required",
      });
    }
    const roleUser = await Role.findById(user.role);

    if (roleUser.name === "admin") {
      return res.status(400).json({
        error: true,
        msg: "You are not authorised to access this page!",
      });
    }
    if (!user) {
      return res.status(400).json({
        error: true,
        msg: "User does not Exist",
      });
    }
    if (user.isVerified == false) {
      return res.status(400).json({
        error: true,
        isVerified: false,
        msg: "User not Verified",
      });
    }
    //   Password check
    const validPass = await bcrypt.compare(req.body.password, user.password);

    if (!validPass) {
      return res.status(400).json({
        error: true,
        msg: "Invalid password",
      });
    }
    //   Create and assign a token
    const token = jwt.sign(
      {
        _id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET
    );
    user.lastLoggedIn = Date.now();
    await user.save();
    return res.status(200).json({
      error: false,
      success: true,
      msg: "Loggedin successfuly",
      login_token: token,
      role: Role.findOne({}, { name: req.body.role }),
    });
  } catch (err) {
    return res.status(400).json({
      error: true,
      msg: err.message,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
