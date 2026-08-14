const express = require("express");
const routes = express.Router();

const userController = require("../controllers/users/usersController");

const addUserRules = require("../validations/addUserValidations");

const validationMiddleware = require("../middlewares/globalValidationMiddleware");

routes.get("/getAll", userController.getAllUsers);

routes.get("/get/:id", userController.getOneUser);

routes.post("/add", addUserRules, validationMiddleware, userController.addUser);

routes.put("/update/:id", userController.updateUser);

routes.delete("/delete/:id", userController.deleteUser);

module.exports = routes;
