"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class OverallInfor extends Model {
		static associate(models) {
			OverallInfor.hasMany(models.SiteInfor, { foreignKey: "companyId" });
		}
		static associate(models) {
			OverallInfor.hasMany(models.ProductInfor, { foreignKey: "companyId" });
		}
	}
	OverallInfor.init(
		{
			companyName: DataTypes.STRING,
			dateFounder: DataTypes.INTEGER,
			mainAddress: DataTypes.STRING,
			mainPhoneNumber: DataTypes.STRING,
			companyWebsite: DataTypes.STRING,
			companySector: DataTypes.STRING,
			companyDescription: DataTypes.TEXT,
			totalRevenue: DataTypes.INTEGER,
			netIncome: DataTypes.INTEGER,
			fullTimeEmployee: DataTypes.INTEGER,
			partTimeEmployee: DataTypes.INTEGER,
			contactInformation: DataTypes.TEXT,
		},
		{
			sequelize,
			modelName: "OverallInfor",
		}
	);
	return OverallInfor;
};
