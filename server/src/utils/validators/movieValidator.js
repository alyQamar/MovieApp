const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const Category = require("../../models/categoryModel");
exports.createMovieValidator = [
  check("title")
    .notEmpty()
    .withMessage("Movie name required")
    .isLength({ min: 3 })
    .withMessage("Too short Movie name (must be at least 3 characters)")
    .isLength({ max: 100 })
    .withMessage("Too long Movie name (must be at most 100 characters)"),

  check("description")
    .notEmpty()
    .withMessage("Movie description required")
    .isLength({ min: 20 })
    .withMessage("Too short movie description (must be at least 20 characters)")
    .isLength({ max: 2000 })
    .withMessage(
      "Too long movie description (must be at most 2000 characters)"
    ),

  check("imageCover").notEmpty().withMessage("Image cover is required"),

  check("images")
    .optional()
    .isArray()
    .withMessage("Images should be an array of strings"),

  check("category")
    .notEmpty()
    .withMessage("Movie must be belong to category")
    .isMongoId()
    .withMessage("Invalid Movie category ID format")
    .custom((categoryId) =>
      Category.findById(categoryId).then((category) => {
        if (!category) {
          return Promise.reject(
            new Error(`Invalid Movie category ID: ${categoryId}`)
          );
        }
      })
    ),

  // check("subcategories")
  //   .optional()
  //   .isMongoId()
  //   .withMessage("Invalid Movie subcategories ID format")
  //   // @desc: Validate Subcategories Existence in Our DB
  //   .custom((subCategoriesIds) =>
  //     SubCategory.find({ _id: { $exists: true, $in: subCategoriesIds } }).then(
  //       (result) => {
  //         if (result.length < 1 || result.length !== subCategoriesIds.length) {
  //           return Promise.reject(new Error(`Invalid Movie subCategories IDs`));
  //         }
  //       }
  //     )
  //   )
  //   // @desc: Validate That Subcategories Belong to Category
  //   .custom((val, { req }) =>
  //     SubCategory.find({ category: req.body.category }).then(
  //       (subcategories) => {
  //         const subCategoriesIdsInDB = [];

  //         subcategories.forEach((subCategory) => {
  //           subCategoriesIdsInDB.push(subCategory._id.toString());
  //         });
  //         // check if subcategories ids in db include subcategories in req.body (true/false)
  //         const checker = (target, arr) => target.every((v) => arr.includes(v));

  //         if (!checker(val, subCategoriesIdsInDB)) {
  //           return Promise.reject(
  //             new Error(`Subcategories not belong to given Category`)
  //           );
  //         }
  //       }
  //     )
  //   ),

  check("actors")
    .optional()
    .isMongoId()
    .withMessage("Invalid Movie actors ID format"),

  check("ratingsAverage")
    .optional()
    .isNumeric()
    .withMessage("Movie ratingsAverage must be a number")
    .isLength({ min: 1 })
    .withMessage("Too short movie ratingsAverage (must be above or equal 1.0)")
    .isLength({ max: 5 })
    .withMessage("Too long movie description (must be below or equal 5.0)"),
  check("ratingQuantity")
    .optional()
    .isNumeric()
    .withMessage("Movie ratingQuantity must be a number"),

  validatorMiddleware,
];
exports.getMovieValidator = [
  check("id").isMongoId().withMessage("Invalid category ID format"),
  validatorMiddleware,
];

exports.updateMovieValidator = [
  check("id").isMongoId().withMessage("Invalid category ID format"),
  validatorMiddleware,
];
exports.deleteMovieValidator = [
  check("id").isMongoId().withMessage("Invalid category ID format"),
  validatorMiddleware,
];
