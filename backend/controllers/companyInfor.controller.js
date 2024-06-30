const CompanyInfoAction = require("../actions/companyInfor.action.js");
const { SuccessResponse, ErrorResponse } = require("../core/ApiResponse.js");

class CompanyInfo {
	async getOverallInfor(req, res) {
		try {
			const { id } = req.params;
			const data = await CompanyInfoAction.getAllOverallInforsForCompany(id);
			return new SuccessResponse().send(req, res, data);
		} catch (error) {
			console.error(error);
			return new ErrorResponse().send(req, res);
		}
	}
}
module.exports = new CompanyInfo();
