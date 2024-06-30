const express = require("express");
const router = express.Router();

const CompanyInfoController = require("../controllers/companyInfor.controller.js");

/* GET home page. */
router.get("/", function (req, res) {
	res.send("hello world");
});

router.get("/get-overall-infor/:id", CompanyInfoController.getOverallInfor);

module.exports = router;
