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
 * @route POST /auth/signup
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

/**
 * @desc Login
 * @route POST /auth/login
 * @access Public
 */

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

/**
 * @desc Login
 * @route POST /auth/login
 * @access Public
 */
exports.auth = asyncHandler(async (req, res, next) => {
  // [x] 1) check if token exists and get
  // console.log(req.headers);
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new ApiError(401, "Please login first to access this route."));
  }
  // [x] 2) verify token (no change happens,expired token)
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  // console.log(decoded);

  // [x] 3) check if user exists
  const currentUser = await User.findById(decoded.userId);
  if (!currentUser) {
    return next(
      new ApiError("The user belongs to this token didn't exist", 401)
    );
  }
  // [x] 4) check if user change his password after token created
  if (currentUser.passwordChangedAt) {
    const passwordChangedTimestamp = parseInt(
      currentUser.passwordChangedAt.getTime() / 1000,
      10
    );
    // console.log(passwordChangedTimestamp, decoded.iat);
    if (passwordChangedTimestamp > decoded.iat) {
      return next(
        // password changed after token created
        new ApiError(
          "User recently change his password. Please login again with new password.... ",
          401
        )
      );
    }
  }
  req.user = currentUser;
  next();
});

// ["admin,"user]
exports.allowedTo = (...roles) =>
  // [x] 1) Access roles
  // [x] 2) Access registered users (req.user.role)
  asyncHandler(async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ApiError("You are not allowed to access this route", 403)
      );
    }
    next();
  });
