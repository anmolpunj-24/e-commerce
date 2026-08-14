const { body } = require("express-validator");

const passwordValidationRules = [
  body("newPassword", "Password is required!")
    .notEmpty()
    .trim()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    )
    .withMessage("Password does not match the requirements!"),
];

module.exports = passwordValidationRules;
