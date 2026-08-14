const { body } = require("express-validator");

const userLoginRules = [
  body("email", "Email is required!")
    .notEmpty()
    .trim()
    .isEmail()
    .withMessage("Please provide a valid email!"),

  body("password", "Password is required!")
    .notEmpty()
    .trim()
    .withMessage("Password does not match!"),
];

module.exports = userLoginRules;
