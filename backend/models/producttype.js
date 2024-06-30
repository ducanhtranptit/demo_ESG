"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class ProductType extends Model {
		static associate(models) {
			ProductType.hasMany(models.ProductType, { foreignKey: "productType" });
		}
	}
	ProductType.init(
		{
			productType: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "ProductType",
		}
	);
	return ProductType;
};
