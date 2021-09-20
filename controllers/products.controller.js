const Product = require("../models/Product.model");
const createError = require("http-errors");
const Review = require("../models/Review.model");

module.exports.listProducts = (req, res, next) => {
  Product.find()
    .then((products) => res.json(products))
    .catch(next);
};

module.exports.productDetail = (req, res, next) => {
  Product.findById(req.params.id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
        model: "User",
      },
    })
    .then((product) => {
      if (!product) {
        next(createError(404));
      } else {
        res.json(product);
      }
    })
    .catch(next);
};

module.exports.review = (req, res, nex) => {
  Review.create({
    title: req.body.title,
    description: req.body.description,
    score: req.body.score,
    product: req.body.id,
    author: req.currentUser,
  });
};
