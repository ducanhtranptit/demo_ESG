const CompanyInfoAction = require("../actions/companyInfor.action.js");
const { SuccessResponse, ErrorResponse, BadRequestResponse } = require("../core/ApiResponse.js");

class CompanyInfoController {
	async getAllCompany(req, res) {
		try {
			const data = await CompanyInfoAction.findAll();
			return new SuccessResponse().send(req, res, data);
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

	async createCompanyInfor(req, res) {
		const data = req.body;
		const overallInfor = {
			companyName: data.companyName,
			dateFounder: data.dateFounder,
			mainAddress: data.mainAddress,
			mainPhoneNumber: data.mainPhoneNumber,
			companyWebsite: data.companyWebsite,
			companySector: data.companySector,
			companyDescription: data.companyDescription,
			totalRevenue: data.totalRevenue,
			netIncome: data.netIncome,
			fullTimeEmployees: data.fullTimeEmployees,
			partTimeEmployees: data.partTimeEmployees,
			contactInformation: data.contactInformation,
		};
		const siteInfors = data.siteInformation
		console.log(siteInfors);
		const productInfors = data.productInformation
		await CompanyInfoAction.createCompanyInfor(overallInfor, siteInfors, productInfors)
		return new SuccessResponse().send(req, res);
	}
}
module.exports = new CompanyInfoController();
