const model = require("../models/index");
const OverallInfor = model.OverallInfor;

class CompanyInfoAction {
	async getAllOverallInforsForCompany(companyId) {
		const result = await OverallInfor.findOne({
			where: {
				id: companyId,
			},
		});
		return result;
	}
}

module.exports = new CompanyInfoAction();
