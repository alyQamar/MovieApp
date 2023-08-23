const crypto = require("crypto");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const User = require("../models/userModel");
const sendEmail = require("../utils/sendEmail");

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
 * @desc Make sure the user is logged in
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

/**
 * @desc Authorization (User permissions)
 */
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

/**
 * @desc Forget password
 * @route POST /auth/forgotPassword
 * @access Public
 */
exports.forgotPassword = asyncHandler(async (req, res, next) => {
  // [x] 1) Get User by Email and check If user exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(
      new ApiError(
        `Invalid email:${req.body.email}. Please try again with correct email`,
        404
      )
    );
  }
  // [x] 2)  Generate hashed reset random 6 digits and save it in database

  // [x] 2.1- If user exists,generate hashed reset random 6 digits
  const resetCode = Math.floor(1000 + Math.random() * 9000).toString();
  const hashedResetCode = crypto
    .createHash("sha256")
    .update(resetCode)
    .digest("hex");
  // console.log(resetCode, "--->", hashedResetCode);

  // [x] 2.2- Save Hashed reset code in database
  user.passwordResetCode = hashedResetCode;
  // add expiration time for password reset code (7 min)
  user.passwordResetExpires = Date.now() + 7 * 60 * 1000;
  user.passwordResetVerified = false;
  await user.save();
  const message = `Hi ${user.name},\n we received a request to reset the password on your MovieApp Account. \n ${resetCode}\n Enter this code to complete the reset. \n Hurry up before 7 minutes.\n\n\n Thanks for helping us keep your account secure. \n The MovieApp Team.`;

  // [x] 3) Send the reset code via email
  try {
    await sendEmail({
      email: user.email,
      subject: "MovieApp Password Reset Code (Hurry Up before 7 minutes)",
      message,
    });
  } catch (err) {
    user.passwordResetCode = undefined;
    user.passwordResetExpires = undefined;
    user.passwordResetVerified = undefined;

    await user.save();
    return next(new ApiError("There is an error in sending email....", 500));
  }

  res.status(200).json({
    status: "success",
    message: "Reset code successfully sent to the email",
  });
});

/**
 * @desc Verify the reset code
 * @route POST /auth/verifyResetCode
 * @access Public
 */
exports.verifyResetCode = asyncHandler(async (req, res, next) => {
  // [x] 1) Get user based on reset code and check if reset code is invalid
  const hashedResetCode = crypto
    .createHash("sha256")
    .update(req.body.resetCode)
    .digest("hex");

  const user = await User.findOne({
    passwordResetCode: hashedResetCode,
    passwordResetExpires: { $gte: Date.now() },
  });
  if (!user) {
    return next(new ApiError("Reset code invalid or expired....", 500));
  }

  // [x] 2) Reset code valid
  user.passwordResetVerified = true;

  await user.save();

  res.status(200).json({ status: "success" });
});

/**
 * @desc Reset password
 * @route POST /auth/ResetPassword
 * @access Public
 */
exports.resetPassword = asyncHandler(async (req, res, next) => {
  // [x] 1) Get user based on email
  const user = await User.findOne({
    email: req.body.email,
  });
  if (!user) {
    return next(
      new ApiError(`There is no user with this email: ${req.body.email}`, 404)
    );
  }
  // [x] 2) Check if reset code verified

  if (!user.passwordResetVerified) {
    return next(
      new ApiError(`Reset code not verified: ${req.body.email}`, 404)
    );
  }
  user.password = req.body.newPassword;
  user.passwordResetCode = undefined;
  user.passwordResetExpires = undefined;
  user.passwordResetVerified = undefined;
  await user.save();

  // [x] 3) Generate Token if everything is OK
  const token = createToken(user._id);
  res.status(200).json({ token });
});
