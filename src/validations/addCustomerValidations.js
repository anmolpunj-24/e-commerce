const { body } = require("express-validator");

const addCustomerRules = [
  body("name", "Name is required!")
    .notEmpty()
    .trim()
    .escape()
    .isLength({ min: 3, max: 20 })
    .withMessage("Please provide a valid name!"),

  body("email", "Email is required!")
    .notEmpty()
    .trim()
    .escape()
    .isEmail()
    .withMessage("Please provide a valid email!"),

  body("password", "Password is required!")
    .notEmpty()
    .trim()
    .escape()
    .withMessage("Password does not match!"),
];

module.exports = addCustomerRules;
