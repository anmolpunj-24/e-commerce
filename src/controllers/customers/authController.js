const authService = require("../../services/authServices");

const userLogin = async (req, res) => {
  console.log(req.user);
  const token = await authService.userLoginService(req.body);

  return res.status(200).json({
    message: "Login succesfull!",
    token: token,
  });
};

const registerUser = async (req, res) => {
  const { user, token } = await authService.registerUserService(req.body);

  return res.status(201).json({
    message: "Registration succesfull!",
    user,
    token,
  });
};

const forgetPassword = async (req, res) => {
  const { email } = req.body;

  // send email link to reset password

  return res.status(200).json({
    message: "Password reset link sent successfully on the registered email!",
  });
};

const resetPassword = async (req, res) => {
  const updatedPassword = await authService.resetPasswordService(
    req.body,
    req.user,
  );

  return res.status(200).json({ message: "Password reset successfully!" });
};

const updatePassword = async (req, res) => {
  const updatedPassword = await authService.updatePasswordService(
    req.body,
    req.user,
  );

  return res.status(200).json({ message: "Password updated successfully!" });
};

const logout = async (req, res) => {
  const userId = req.user._id;

  if (!userId) {
    return res.status(401).json({ message: "User not found!" });
  }

  const deletedSessionToken = await authService.logoutService(userId);
  return res.status(200).json({ message: "Logout successfull!" });
};

// const logout = async (req, res) => {
//   // Extract token from 'Bearer <token>'
//   const token = req.headers.authorization?.split(' ')[1];

//   if (!token) {
//     return res.status(401).json({ message: "No token provided!" });
//   }

//   // Delete the specific session matching this token
//   const deletedSession = await sessionModel.findOneAndDelete({ token: token });

//   if (!deletedSession) {
//     return res.status(404).json({ message: "Session already invalid!" });
//   }

//   return res.status(200).json({ message: "Logout successful!" });
// };

// const logout = async (req, res) => {
//   const userId = req.user._id;

//   if (!userId) {
//     return res.status(400).json({ message: "User ID is required!" });
//   }

//   // This clears out every single session document matching this userId
//   await sessionModel.deleteMany({ userId: userId });

//   return res.status(200).json({ message: "Logged out from all devices successfully!" });
// };

module.exports = {
  userLogin,
  registerUser,
  forgetPassword,
  resetPassword,
  updatePassword,
  logout,
};
