const mongoose = require("mongoose");

const QuerySchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
    },
    Subject: {
      type: String,
      required: true,
    },
    Message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const Query = mongoose.model("Query", QuerySchema);
module.exports = Query;
