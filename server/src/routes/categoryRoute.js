const express = require("express");

const {
  getCategoryValidator,
  createCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
} = require("../utils/validators/categoryValidator");

const {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  uploadCategoryImage,
  resizeImage,
} = require("../services/categoryService");

const authService = require("../services/authService");

const router = express.Router();

router
  .route("/")
  .get(authService.auth, authService.allowedTo("admin"), getCategories)
  .post(
    authService.auth,
    authService.allowedTo("admin"),
    uploadCategoryImage,
    resizeImage,
    createCategoryValidator,
    createCategory
  );
router
  .route("/:id")
  .get(authService.allowedTo("admin"), getCategoryValidator, getCategory)
  .put(
    authService.auth,
    authService.allowedTo("admin"),
    uploadCategoryImage,
    resizeImage,
    updateCategoryValidator,
    updateCategory
  )
  .delete(
    authService.auth,
    authService.allowedTo("admin"),
    deleteCategoryValidator,
    deleteCategory
  );
module.exports = router;
