// routes/ad.js
const express = require("express");
const router = express.Router();

const {
  putUpdatePassword,
  postCreatePassword,
} = require("../controllers/admin");

/**
 * @route PUT api/ad/:id
 * @description update ad
 * @access public
 */
router.put("/", putUpdatePassword);

// router.post("/", postCreatePassword);

module.exports = router;
