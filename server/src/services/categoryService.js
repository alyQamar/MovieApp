const Category = require("../models/categoryModel");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const apiError = require("../utils/apiError");
const ApiError = require("../utils/apiError");
// @desc Get list of categories
// @route GET /categories
// @access public
exports.getCategories = asyncHandler(async (req, res) => {
  // pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 5;
  // in page NO.5 [(5-1)*5] so we skip 20 items which are in the last 4 pages
  const skip = (page - 1) * limit;

  const categories = await Category.find({}).skip(skip).limit(limit);
  res.status(200).json({ results: categories.length, page, data: categories });
});

// @desc Get specific category by id
// @route GET categories/:id
// @access Public
exports.getCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await Category.findById(id);
  if (!category) {
    return next(new ApiError(`Category id: ${id}  not found`, 404));
  }
  res.status(200).json({ data: category });
});
// @desc Create a category
// @route POST /categories
// @access Private
exports.createCategory = asyncHandler(async (req, res) => {
  const name = req.body.name;
  const category = await Category.create({ name, slug: slugify(name) });
  res.status(201).json({ data: category });
});

// @desc Update a category
// @route PUT categories/:id
// @access Private
exports.updateCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  const category = await Category.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name) },
    { new: true }
  );
  if (!category) {
    return next(new ApiError(`Category id: ${id}  not found`, 404));
  }
  res.status(200).json({ data: category });
});

// @desc Delete a category
// @route DELETE categories/:id
// @access Private
exports.deleteCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await Category.findByIdAndDelete(id);
  if (!category) {
    return next(new ApiError(`Category id: ${id}  not found`, 404));
  }
  res.status(204).send();
});
