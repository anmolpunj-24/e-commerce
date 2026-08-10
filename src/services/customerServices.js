const customerModel = require("../models/customers");

const addCustomerService = async (customerData) => {
  const { name, email, password } = customerData;

  const newCustomer = new customerModel({
    name,
    email,
    password,
  });

  const savedCustomer = await newCustomer.save();

  return savedCustomer;
};

const getAllCustomersService = async () => {
  const allCustomers = await customerModel.find();

  return allCustomers;
};

const getOneCustomerService = async (id) => {
  const customerData = await customerModel.findById(id);

  return customerData;
};

const updateCustomerService = async (id, customerData) => {
  const updatedCustomer = await customerModel.findByIdAndUpdate(
    id,
    customerData,
    { returnDocument: "after", runValidators: true },
  );

  return updatedCustomer;
};

const deleteCustomerService = async (id) => {
  const deletedCustomer = await customerModel.findByIdAndDelete(id);
  return deletedCustomer;
};

module.exports = {
  addCustomerService,
  getAllCustomersService,
  getOneCustomerService,
  updateCustomerService,
  deleteCustomerService,
};
