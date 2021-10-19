const express = require("express");
const emailController = require("../controller/emailController");

let router = express.Router();
router.use(express.json());

router.post("/sendmail", emailController.sender);

module.exports = router;
