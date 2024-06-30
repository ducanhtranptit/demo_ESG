const model = require("../models/index");
const OverallInfor = model.OverallInfor;
const SiteInfor = model.SiteInfor;
const ProductInfor = model.ProductInfor;

class CompanyInfoAction {
	async findAll() {
		const result = await OverallInfor.findAll({
			attributes: ["id", "companyName"],
		});
		console.log(result);
		return result;
	}

	async getAllOverallInforsForCompany(companyId) {
		const result = await OverallInfor.findOne({
			where: {
				id: companyId,
			},
		});
		return result;
	}

	async getAllCompanyInfors(companyId) {
		const overallInfor = await OverallInfor.findAll({ where: { id: companyId } });
		if (overallInfor.length === 0) {
			return null;
		}
		const siteInfors = await SiteInfor.findAll({ where: { companyId: companyId } });
		const productInfors = await ProductInfor.findAll({ where: { companyId: companyId } });

		const result = {
			overallInfor,
			siteInfors,
			productInfors,
		};
		return result;
	}
}

module.exports = new CompanyInfoAction();
