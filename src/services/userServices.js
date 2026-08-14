const userModel = require("../models/users");

const addUserService = async (userData) => {
  const { name, email, password } = userData;

  const newUser = new userModel({
    name,
    email,
    password,
  });

  const savedUser = await newUser.save();

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
  const updatedUser = await userModel.findByIdAndUpdate(
    id,
    userData,
    { returnDocument: "after", runValidators: true },
  );

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
