const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
  const attributes = {
    product_name: { type: DataTypes.STRING, allowNull: false },
    product_discription: { type: DataTypes.STRING, allowNull: true },
    product_status: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
  };
  return sequelize.define("product", attributes);
}
