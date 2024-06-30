const CompanyInfoAction = require("../actions/companyInfor.action.js");
const { SuccessResponse, ErrorResponse, BadRequestResponse } = require("../core/ApiResponse.js");

class CompanyInfoController {
	async getAllCompany(req, res) {
		try {
			const data = await CompanyInfoAction.findAll()
			return new SuccessResponse().send(req, res, data)
		} catch (error) {
			console.error(error);
			return new ErrorResponse().send(req, res);
		}
	}

	async getOverallInfor(req, res) {
		try {
			const { id } = req.params;
			if (!id) return new BadRequestResponse().send(req, res);
			const data = await CompanyInfoAction.getAllOverallInforsForCompany(parseInt(id));
			return new SuccessResponse().send(req, res, data);
		} catch (error) {
			console.error(error);
			return new ErrorResponse().send(req, res);
		}
	}

	async getAllCompanyInfors(req, res) {
		try {
			const { id } = req.params;
			if (!id) return new BadRequestResponse().send(req, res);	
			const data = await CompanyInfoAction.getAllCompanyInfors(parseInt(id));
			return new SuccessResponse().send(req, res, data);
		} catch (error) {
			console.error(error);
			return new ErrorResponse().send(req, res);
		}
	}
}
module.exports = new CompanyInfoController();
