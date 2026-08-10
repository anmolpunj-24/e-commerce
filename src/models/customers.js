const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required!"],
      lowercase: true,
    },

    email: {
      type: String,
      required: [true, "Email is required!"],
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: [true, "Password is required!"],
    },

    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

const customers = mongoose.model("customers", customerSchema);
module.exports = customers;
