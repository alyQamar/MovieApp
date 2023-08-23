const express = require("express");
const {
  getMovieValidator,
  createMovieValidator,
  updateMovieValidator,
  deleteMovieValidator,
} = require("../utils/validators/movieValidator");
const {
  getMovies,
  getMovie,
  createMovie,
  updateMovie,
  deleteMovie,
} = require("../services/movieService");

const authService = require("../services/authService");

const router = express.Router();

router
  .route("/")
  .get(authService.auth, authService.allowedTo("admin"), getMovies)
  .post(
    authService.auth,
    authService.allowedTo("admin"),
    createMovieValidator,
    createMovie
  );
router
  .route("/:id")
  .get(
    authService.auth,
    authService.allowedTo("admin"),
    getMovieValidator,
    getMovie
  )
  .put(
    authService.auth,
    authService.allowedTo("admin"),
    updateMovieValidator,
    updateMovie
  )
  .delete(
    authService.auth,
    authService.allowedTo("admin"),
    deleteMovieValidator,
    deleteMovie
  );
module.exports = router;
