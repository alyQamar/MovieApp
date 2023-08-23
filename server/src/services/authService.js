const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const User = require("../models/userModel");

const createToken = (payload) =>
  jwt.sign({ userId: payload }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE_TIME,
  });
/**
 * @desc Signup
 * @route GET /auth/signup
 * @access Public
 */

exports.signup = asyncHandler(async (req, res, next) => {
  // 1-Create user
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  //   2-Generate token
  const token = createToken(user._id);
  res.status(200).json({ data: user, token });
});

exports.login = asyncHandler(async (req, res, next) => {
  // 1) check if password and email in body

  // 2) check if user exists & check if password correct
  const user = await User.findOne({ email: req.body.email });
  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return next(new ApiError("Incorrect email or password", 401));
  }

  // 3) Generate token
  const token = createToken(user._id);

  // 5) Send response
  res.status(200).json({ data: user, token });
});
