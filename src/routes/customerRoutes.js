const express = require("express");
const routes = express.Router();

const customerController = require("../controllers/customersController");

const addCustomerRules = require("../validations/addCustomerValidations");

const validationMiddleware = require("../middlewares/globalValidationMiddleware");

routes.get("/getAll", customerController.getAllCustomers);

routes.get("/get/:id", customerController.getOneCustomer);

routes.post(
  "/add",
  addCustomerRules,
  validationMiddleware,
  customerController.addCustomer,
);

routes.put("/update/:id", customerController.updateCustomer);

routes.delete("/delete/:id", customerController.deleteCustomer);

module.exports = routes;
