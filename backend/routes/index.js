const express = require("express");
const router = express.Router();

const CompanyInfoController = require("../controllers/companyInfor.controller.js");

router.get("/get-all-company", CompanyInfoController.getAllCompany);
router.get("/get-overall-infor/:id", CompanyInfoController.getOverallInfor);
router.get("/get-all-company-infor/:id", CompanyInfoController.getAllCompanyInfors);
router.post("/create-company-infor", CompanyInfoController.createCompanyInfor);

module.exports = router;
