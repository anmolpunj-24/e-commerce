const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const user = require("../models/users");
const accessTokensModel = require("../models/access_tokens");

const userLoginService = async (body) => {
  const { email, password } = body;

  const existingUser = await user.findOne({
    email: email.toLowerCase(),
  });

  if (!existingUser) {
    return res.status(401).json({ message: "Invalid email or password!" });
  }

  const isPasswordValid = await bcrypt.compare(password, existingUser.password);

  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid email or password!" });
  }

  const token = jwt.sign({ email: existingUser.email }, "", {
    algorithm: "none",
  });

  return token;
};

const registerUserService = async (body) => {
  const { name, email, password } = body;

  const token = jwt.sign(
    {
      name: name,
      email: email,
    },
    "",
    {
      algorithm: "none",
    },
  );

  const newUser = new user({
    name,
    email,
    password,
  });

  const registeredUser = await newUser.save();

  const newSessionToken = new accessTokensModel({
    userId: registeredUser?._id,
    token: token,
  });

  const savedSessionToken = await newSessionToken.save();

  return {
    user: registeredUser,
    token,
  };
};

const forgetPasswordService = async () => {};

const resetPasswordService = async (body, user) => {
  const { newPassword, confirmNewPassword } = body;

  if (!newPassword || !confirmNewPassword) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  if (newPassword != confirmNewPassword) {
    return res
      .status(422)
      .json({ message: "New password and confirm password does not match!" });
  }

  user.password = newPassword;

  const updatedPassword = await user.save();

  return updatedPassword;
};

const updatePasswordService = async (body, user) => {
  const { currentPassword, newPassword, confirmNewPassword } = body;

  if (!currentPassword || !newPassword || !confirmNewPassword) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  const validCurrentPassword = await bcrypt.compare(
    currentPassword,
    user.password,
  );

  if (!validCurrentPassword) {
    return res.status(401).json({ message: "Invalid password!" });
  }

  if (newPassword != confirmNewPassword) {
    return res
      .status(422)
      .json({ message: "New password and confirm password does not match!" });
  }

  user.password = newPassword;

  const updatedPassword = await user.save();

  return updatedPassword;
};

const logoutService = async (id) => {
  const deletedSessionToken = await accessTokensModel.deleteOne({ _id: id });
  return deletedSessionToken;
};

module.exports = {
  userLoginService,
  registerUserService,
  forgetPasswordService,
  resetPasswordService,
  updatePasswordService,
  logoutService,
};
