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

	async createCompanyInfor(overallInfor, siteInfors, productInfors) {
		const newCompany = await OverallInfor.create({
			companyName: overallInfor.companyName,
			dateFounder: parseInt(overallInfor.dateFounder),
			mainAddress: overallInfor.mainAddress,
			mainPhoneNumber: overallInfor.mainPhoneNumber,
			companyWebsite: overallInfor.companyWebsite,
			companySector: overallInfor.companySector,
			companyDescription: overallInfor.companyDescription,
			totalRevenue: parseInt(overallInfor.totalRevenue),
			netIncome: parseInt(overallInfor.netIncome),
			fullTimeEmployee: parseInt(overallInfor.fullTimeEmployees),
			partTimeEmployee: parseInt(overallInfor.partTimeEmployees),
			contactInformation: overallInfor.contactInformation,
		});

		// Create site information
		await SiteInfor.bulkCreate(
			siteInfors.map((site) => ({
				companyId: newCompany.id,
				siteName: site.siteName,
				numberEmployees: parseInt(site.numberOfEmployees),
				comment: site.comment,
			}))
		);

		// Create product information if needed
		if (productInfors.length > 0) {
			await ProductInfor.bulkCreate(
				productInfors.map((product) => ({
					companyId: newCompany.id,
					productName: product.productName,
					revenue: parseInt(product.revenue),
					comment: product.comment,
				}))
			);
		}
	}
}

module.exports = new CompanyInfoAction();
