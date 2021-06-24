const mongoose = require("mongoose");

const CustomerStatusSchema = new mongoose.Schema({
  status: {
    type: String,
    required: true,
    default: "Pending",
  },
});

const CustomerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    rentname: {
      type: String,
      required: true,
    },
    comments: {
      type: String,
      required: true,
    },
    CustomerStatusSchema,
  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose.models.rents || mongoose.model("rents", CustomerSchema);
