const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: "You must set a review title",
    },
    description: {
      type: String,
      required: "You must set a review description",
    },
    score: {
      type: Number,
      required: "You must set a review score",
      min: 0,
      max: 5,
    },
    author: {
      type: mongoose.Types.ObjectId,
      required: "An author is required",
      ref: "User",
    },
    product: {
      type: mongoose.Types.ObjectId,
      required: "A product is required",
      ref: "Product",
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
