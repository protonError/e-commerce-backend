var express = require("express");
const router = express.Router();
// import { RegisterUser } from "../controllers/UserController";
const { registerUser, loginUser } = require("../controllers/authController");
// route to register a new user
router.post("/registerUser", registerUser);
// route to login a user
router.post("/loginUser", loginUser);

module.exports = router;
