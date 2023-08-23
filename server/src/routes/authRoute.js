const express = require("express");

const {
  signupValidator,
  loginValidator,
} = require("../utils/validators/authValidator");

const { signup, login } = require("../services/authService");

const router = express.Router();

router.route("/signup").post(signupValidator, signup);

router.route("/login").post(loginValidator, login);

// router
//   .route("/:id")
//   .get(getUserValidator, getUser)
//   .put(uploadUserImage, resizeImage, updateUserValidator, updateUser)
//   .delete(deleteUser, deleteUserValidator);

module.exports = router;
