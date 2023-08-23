const express = require("express");

const {
  getUserValidator,
  createUserValidator,
  updateUserValidator,
  deleteUserValidator,
  changeUserPasswordValidator,
} = require("../utils/validators/userValidator");

const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  uploadUserImage,
  resizeImage,
  changeUserPassword,
  getLoggedUserData,
} = require("../services/userService");
const authService = require("../services/authService");

const router = express.Router();

router.get(
  "/getMe",
  authService.auth,
  authService.allowedTo("user"),
  getLoggedUserData,
  getUser
);
// admin
router.use(authService.auth, authService.allowedTo("admin"));

router.put(
  "/changePassword/:id",
  changeUserPasswordValidator,
  changeUserPassword
);

router
  .route("/")
  .get(getUsers)
  .post(uploadUserImage, resizeImage, createUserValidator, createUser);
router
  .route("/:id")
  .get(getUserValidator, getUser)
  .put(uploadUserImage, resizeImage, updateUserValidator, updateUser)
  .delete(deleteUser, deleteUserValidator);
module.exports = router;
