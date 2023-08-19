const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const Movie = require("../models/movieModel");
const ApiError = require("../utils/apiError");

/**
 * @desc Get list of movies
 * @route GET /movies
 * @access public
 */

exports.getMovies = asyncHandler(async (req, res) => {
  // pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 5;
  // in page NO.5 [(5-1)*5] so we skip 20 items which are in the last 4 pages
  const skip = (page - 1) * limit;

  const movies = await Movie.find({})
    .skip(skip)
    .limit(limit)
    .populate({ path: "category", select: "name -_id" });
  res.status(200).json({ results: movies.length, page, data: movies });
});

/**
 * @desc Get specific movie by id
 * @route GET movies/:id
 * @access Public
 */
exports.getMovie = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const movie = await Movie.findById(id).populate({
    path: "category",
    select: "name -_id",
  });
  if (!movie) {
    return next(new ApiError(`Movie id: ${id}  not found`, 404));
  }
  res.status(200).json({ data: movie });
});

/**
 * @desc Create a movie
 * @route POST /movies
 * @access Private
 */
exports.createMovie = asyncHandler(async (req, res) => {
  req.body.slug = slugify(req.body.title);

  const movie = await Movie.create(req.body);
  res.status(201).json({ data: movie });
});

/**
 * @desc Update a movie
 * @route PUT movies/:id
 * @access Private
 */
exports.updateMovie = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  if (req.body.title) req.body.slug = slugify(req.body.title);

  const movie = await Movie.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
  });
  if (!movie) {
    return next(new ApiError(`Movie id: ${id}  not found`, 404));
  }
  res.status(200).json({ data: movie });
});
/**
 * @desc Delete a movie
 * @route DELETE movies/:id
 * @access Private
 */
exports.deleteMovie = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const movie = await Movie.findByIdAndDelete(id);
  if (!movie) {
    return next(new ApiError(`Movie id: ${id}  not found`, 404));
  }
  res.status(204).send();
});
