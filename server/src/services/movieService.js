const Movie = require("../models/movieModel");
const factory = require("./handlersFactory");
// apiFeatures
/**
 * @desc Get list of movies
 * @route GET /movies
 * @access public
 */

exports.getMovies = factory.getAll(Movie, "Movie");

/**
 * @desc Get specific movie by id
 * @route GET movies/:id
 * @access Public
 */
exports.getMovie = factory.getOne(Movie);

/**
 * @desc Create a movie
 * @route POST /movies
 * @access Private
 */
exports.createMovie = factory.createOne(Movie);

/**
 * @desc Update a movie
 * @route PUT movies/:id
 * @access Private
 */
exports.updateMovie = factory.updateOne(Movie);
/**
 * @desc Delete a movie
 * @route DELETE movies/:id
 * @access Private
 */
exports.deleteMovie = factory.deleteOne(Movie);
