const { v4: uuidv4 } = require("uuid");
const sharp = require("sharp");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const factory = require("./handlersFactory");
const { uploadSingleImage } = require("../middlewares/uploadImage");
const ApiError = require("../utils/apiError");
const bcrypt = require("bcryptjs");

// Upload single image
exports.uploadUserImage = uploadSingleImage("profileImg");

// Image processing
exports.resizeImage = asyncHandler(async (req, res, next) => {
  if (req.file) {
    const filename = `user-${uuidv4()}-${Date.now()}.jpeg`;
    await sharp(req.file.buffer)
      .resize(600, 600)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`uploads/users/${filename}`);

    req.body.profileImage = filename;
  }
  next();
});

/**
 * @desc Get list of users
 * @route GET /users
 * @access Private
 */

exports.getUsers = factory.getAll(User);

/**
 * @desc Get specific User by id
 * @route GET users/:id
 * @access Private
 */
exports.getUser = factory.getOne(User);
/**
 * @desc Create a User
 * @route POST /users
 * @access Private
 */
exports.createUser = factory.createOne(User);

/**
 * @desc Update a User information
 * @route PUT users/:id
 * @access Private
 */
exports.updateUser = asyncHandler(async (req, res, next) => {
  const document = await User.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      slug: req.body.slug,
      phone: req.body.phone,
      email: req.body.email,
      profileImage: req.body.profileImage,
      role: req.body.role,
    },
    {
      new: true,
    }
  );
  if (!document) {
    return next(new ApiError(`No document for this id ${req.params.id}`, 404));
  }
  res.status(200).json({ data: document });
});
/**
 * @desc Update a User password
 * @route PUT users/:id
 * @access Private
 */

exports.changeUserPassword = asyncHandler(async (req, res, next) => {
  const document = await User.findByIdAndUpdate(
    req.params.id,
    {
      password: await bcrypt.hash(req.body.password, 12),
      passwordChangedAt: Date.now(),
    },
    {
      new: true,
    }
  );
  if (!document) {
    return next(new ApiError(`No document for this id ${req.params.id}`, 404));
  }
  res.status(200).json({ data: document });
});
/**
 * @desc Delete a User
 * @route DELETE users/:id
 * @access Private
 */

exports.deleteUser = factory.deleteOne(User);
