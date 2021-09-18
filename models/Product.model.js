const mongoose = require("mongoose");
const Review = require("./Review.model");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: "You must set a product name",
    },
    description: {
      type: String,
      required: "You must set a product description",
    },
    price: {
      type: Number,
      required: "You must set a product price",
    },
    images: {
      type: [String],
      required: "At least one image is required",
      validate: {
        validator: (value) => {
          try {
            return value
              .map((v) => new URL(v))
              .every((v) => v.protocol === "http:" || v.protocol === "https:");
          } catch (e) {
            return false;
          }
        },
      },
    },
    seller: {
      type: mongoose.Types.ObjectId,
      required: "A seller is required",
      ref: "User",
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

productSchema.virtual("reviews", {
  ref: Review.modelName,
  localField: "_id",
  foreignField: "product",
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
