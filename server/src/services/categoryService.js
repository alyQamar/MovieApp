const { v4: uuidv4 } = require("uuid");
const sharp = require("sharp");
const asyncHandler = require("express-async-handler");

const factory = require("./handlersFactory");
const { uploadSingleImage } = require("../middlewares/uploadImage");
const Category = require("../models/categoryModel");

// Upload single image
exports.uploadCategoryImage = uploadSingleImage("image");

// Image processing
exports.resizeImage = asyncHandler(async (req, res, next) => {
  if (req.file) {
    const filename = `category-${uuidv4()}-${Date.now()}.jpeg`;
    await sharp(req.file.buffer)
      .resize(600, 600)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`uploads/categories/${filename}`);

    req.body.image = filename;
  }
  next();
});

/**
 * @desc Get list of categories
 * @route GET /categories
 * @access public
 */

exports.getCategories = factory.getAll(Category);

/**
 * @desc Get specific category by id
 * @route GET categories/:id
 * @access Public
 */
exports.getCategory = factory.getOne(Category);

/**
 * @desc Create a category
 * @route POST /categories
 * @access Private
 */
exports.createCategory = factory.createOne(Category);

/**
 * @desc Update a category
 * @route PUT categories/:id
 * @access Private
 */
exports.updateCategory = factory.updateOne(Category);
/**
 * @desc Delete a category
 * @route DELETE categories/:id
 * @access Private
 */
exports.deleteCategory = factory.deleteOne(Category);
