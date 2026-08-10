const { body } = require("express-validator");

const customerLoginRules = [
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
    .isLength({ min: 8 })
    .withMessage("Password does not match!"),
];

module.exports = customerLoginRules;
