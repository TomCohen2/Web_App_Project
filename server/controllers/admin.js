// controllers/ad.js
const Password = require("../Models/Password");

exports.putUpdatePassword = (req, res) => {
  Password.findByIdAndUpdate("620a39d44ecf20c8fc3fbbe4", req.body)
    .then((data) =>
      res.json({ message: "updated successfully", data }, console.log(data))
    )
    .catch((err) =>
      res
        .status(400)
        .json({ message: "Failed to update password", error: err.message })
    );
};

exports.postCreateAd = (req, res) => {
  Ad.create(req.body)
    .then((data) => res.json({ message: "Ad added successfully", data }))
    .catch((err) =>
      res.status(400).json({ message: "Failed to add ad", error: err.message })
    );
};
