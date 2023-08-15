const { query } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

exports.getCategoryValidator = [
  query("id").isMongoId().withMessage("Invalid category id format"),
  validatorMiddleware,
];

exports.createCategoryValidator = [
  query("name")
    .notEmpty()
    .withMessage("Category name required")
    .isLength({ min: 3 })
    .withMessage("Too short category name")
    .isLength({ max: 32 })
    .withMessage("Too long category name"),
  validatorMiddleware,
];
exports.updateCategoryValidator = [
  query("id").isMongoId().withMessage("Invalid category id format"),
  validatorMiddleware,
];
exports.deleteCategoryValidator = [
  query("id").isMongoId().withMessage("Invalid category id format"),
  validatorMiddleware,
];
