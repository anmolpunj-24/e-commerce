const userModel = require("../models/users");
const customerModel = require("../models/customers");

const addUserService = async (userData) => {
  const { name, email, password, gender, dob, phone } = userData;

  const newUser = new userModel({
    name,
    email,
    password,
  });

  const savedUser = await newUser.save();

  const newCustomer = new customerModel({
    userId: savedUser?._id,
    gender,
    dob,
    phone,
  });

  const savedCustomer = await newCustomer.save();

  return savedUser;
};

const getAllUsersService = async () => {
  const allUsers = await userModel.find();

  return allUsers;
};

const getOneUserService = async (id) => {
  const userData = await userModel.findById(id);

  return userData;
};

const updateUserService = async (id, userData) => {
  const updatedUser = await userModel.findByIdAndUpdate(id, userData, {
    returnDocument: "after",
    runValidators: true,
  });

  return updatedUser;
};

const deleteUserService = async (id) => {
  const deletedUser = await userModel.findByIdAndDelete(id);
  return deletedUser;
};

module.exports = {
  addUserService,
  getAllUsersService,
  getOneUserService,
  updateUserService,
  deleteUserService,
};
