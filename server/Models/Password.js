const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let passwordSchema = new Schema(
  {
    password: {
      type: String,
    },
  },
  {
    collection: "admin_details",
  }
);

module.exports = mongoose.model("Password", passwordSchema);
