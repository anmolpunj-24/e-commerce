const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },

    gender: { type: String },

    dob: { type: String },

    phone: {
      type: String,
      required: [true, "Phone is required!"],
      unique: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    deletedAt: { type: Date, default: null },
  },
  { timestamps: true },
);

const customers = mongoose.model("customers", customerSchema);
module.exports = customers;
