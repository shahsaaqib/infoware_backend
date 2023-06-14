'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class contactDetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Employee, {
        foreignKey: 'empId',
      });
    }
  }
  contactDetails.init(
    {
      contactNumber: DataTypes.STRING,
      empId: DataTypes.INTEGER,
      type: DataTypes.STRING,
      name: DataTypes.STRING,
      relationship: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'contactDetails',
    }
  );
  return contactDetails;
};
