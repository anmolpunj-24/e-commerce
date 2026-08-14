const { body } = require("express-validator");

const userRegistrationRules = [
  body("name", "Name is required!")
    .notEmpty()
    .trim()
    .isLength({ min: 3, max: 20 })
    .withMessage("Please provide a valid name!"),

  body("email", "Email is required!")
    .notEmpty()
    .trim()
    .isEmail()
    .withMessage("Please provide a valid email!"),

  body("password", "Password is required!")
    .notEmpty()
    .trim()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    )
    .withMessage("Password does not match requirements!"),
];

module.exports = userRegistrationRules;
