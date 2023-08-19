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

const router = express.Router();

router.route("/").get(getMovies).post(createMovieValidator, createMovie);
router
  .route("/:id")
  .get(getMovieValidator, getMovie)
  .put(updateMovieValidator, updateMovie)
  .delete(deleteMovieValidator, deleteMovie);
module.exports = router;
