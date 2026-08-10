const express = require("express");
const routes = express.Router();

const customerLoginRules = require("../validations/customerLoginValidations");
const customerRegisterRules = require("../validations/customerRegisterValidations");

const validationMiddleware = require("../middlewares/globalValidationMiddleware");

const authController = require("../controllers/customers/authController");

routes.post(
  "/login",
  customerLoginRules,
  validationMiddleware,
  authController.customerLogin,
);

routes.post(
  "/register",
  customerRegisterRules,
  validationMiddleware,
  authController.registerCustomer,
);

module.exports = routes;
