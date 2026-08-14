const userService = require("../../services/userServices");

const addUser = async (req, res) => {
  const newUser = await userService.addUserService(req.body);

  return res
    .status(201)
    .json({ message: "User Created!", user: newUser });
};

const getAllUsers = async (req, res) => {
  const allUsers = await userService.getAllUsersService();

  return res
    .status(200)
    .json({ message: "All users Fetched!", users: allUsers });
};

const getOneUser = async (req, res) => {
  const userId = req.params.id;

  const userData = await userService.getOneUserService(userId);

  return res
    .status(200)
    .json({ message: "User Fetched!", user: userData });
};

const updateUser = async (req, res) => {
  const userId = req.params.id;

  if (!userId) {
    return res.status(401).json({ message: "User id not found!" });
  }

  const updatedUser = await userService.updateUserService(
    userId,
    req.body,
  );

  return res
    .status(200)
    .json({ message: "User Updated!", user: updatedUser });
};

const deleteUser = async (req, res) => {
  const userId = req.params.id;

  if (!userId) {
    return res.status(401).json({ message: "User id not found!" });
  }

  const deletedUser =
    await userService.deleteUserService(userId);

  return res
    .status(200)
    .json({ message: "User Deleted!", user: deletedUser });
};

module.exports = {
  addUser,
  getAllUsers,
  getOneUser,
  updateUser,
  deleteUser,
};
