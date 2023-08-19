const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, "Too short movie title"],
      maxlength: [100, "Too long movie title"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    description: {
      type: String,
      // required: [true, "Movie description is required"],
      // minlength: [20, "Too short Movie description"],
      maxlength: [2000, "Too long Movie description"],
    },
    year: String,
    type: String,
    language: String,
    country: String,
    prodCompany: String,
    duration: Number,
    boxOffice: Number,
    trailer: String,
    image: {
      type: String,
      required: [true, "Movie Image is required"],
    },
    images: [String],
    category: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: [true, "Movie must belong to a category"],
      },
    ],
    actors: [
      {
        id: Number,
        name: String,
        birthday: String,
        nationality: String,
        bio: String,
        image: String,
        movieIds: [String],
      },
    ],
    ratingsAverage: {
      type: Number,
      min: [0, "Rating must be above or equal to 1.0"],
      max: [10, "Rating must be below or equal to 10.0"],
    },
    ratingQuantity: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
