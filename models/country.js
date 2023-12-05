const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const { DB_TABLES } = require('../config/constant');

const Countries = sequelize.define(DB_TABLES.COUNTRIES, {
  id: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  country_name: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: true
  }
},
  {
    tableName: DB_TABLES.COUNTRIES,
  });

module.exports = Countries;