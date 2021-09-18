require("../config/db.config");
const mongoose = require("mongoose");
const faker = require("faker");
const Product = require("../models/Product.model");
const User = require("../models/User.model");
const Review = require("../models/Review.model");

let users = [];

mongoose.connection.once("open", () => {
  console.info(
    `*** Connected to the database ${mongoose.connection.db.databaseName} ***`
  );

  mongoose.connection.db
    .dropDatabase()
    .then(() => console.log("Database clear"))
    .then(() => {
      /** Create data here */
      for (let i = 0; i < 5; i++) {
        users.push({
          email: faker.internet.email(),
          password: "12345678",
          name: faker.name.findName(),
          image: faker.internet.avatar(),
        });
      }
      console.log(users[0].email);
      return User.create(users);
    })
    .then((dbusers) => {
      users = dbusers;
      const products = [];
      for (let i = 0; i < 100; i++) {
        products.push({
          name: faker.commerce.productName(),
          description: faker.commerce.productDescription(),
          price: faker.commerce.price(),
          images: [
            faker.image.abstract(),
            faker.image.abstract(),
            faker.image.abstract(),
          ],
          seller: randomArrayElement(users)._id,
        });
      }
      return Product.insertMany(products);
    })
    .then((products) => {
      const reviews = [];
      for (product of products) {
        for (let i = 0; i < 3; i++) {
          let author;
          while (!author) {
            const randomUser = randomArrayElement(users);
            if (randomUser._id !== product.seller) {
              author = randomUser;
            }
          }
          reviews.push({
            title: faker.lorem.words(5),
            description: faker.lorem.lines(5),
            score: Math.floor(Math.random() * 6),
            product: product._id,
            author: author._id,
          });
        }
      }
      return Review.create(reviews);
    })
    .then(() => console.info(`- All data created!`))
    .catch((error) => console.error(error))
    .finally(() => process.exit(0));
});

const randomArrayElement = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};
