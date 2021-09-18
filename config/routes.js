const express = require("express");
const productsController = require("../controllers/products.controller");
const authController = require("../controllers/auth.controller");
const usersController = require("../controllers/users.controller");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");

router.get("/products", productsController.listProducts);
router.get("/products/:id", productsController.productDetail);

router.post("/login", authMiddleware.isNotAuthenticated, authController.login);

router.get(
  "/users/me",
  authMiddleware.isAuthenticated,
  usersController.getCurrentUser
);

module.exports = router;
