const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const customer = require("../../models/customers");

const customerLogin = async (req, res) => {
  const { email, password } = req.body;

  const existingCustomer = await customer.findOne({
    email: email.toLowerCase(),
  });

  if (!existingCustomer) {
    return res.status(401).json({ message: "Invalid email or password!" });
  }

  const isPasswordValid = await bcrypt.compare(
    password,
    existingCustomer.password,
  );

  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid email or password!" });
  }

  const token = jwt.sign({ email: existingCustomer.email }, "", {
    algorithm: "none",
  });

  return res.status(200).json({
    message: "Login succesfull!",
    token: token,
  });
};

const registerCustomer = async (req, res) => {
  const { name, email, password } = req.body;

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

  const newCustomer = new customer({
    name,
    email,
    password,
  });

  const registeredCustomer = await newCustomer.save();

  return res.status(200).json({
    message: "Registration succesfull!",
    user: registeredCustomer,
    token: token,
  });
};

module.exports = { customerLogin, registerCustomer };
