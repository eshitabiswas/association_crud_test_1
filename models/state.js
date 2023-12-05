const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const { DB_TABLES } = require('../config/constant');

const Country = require('../models/country')

const States = sequelize.define(DB_TABLES.STATES, {
  id: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  state_name: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  country_id: {
    type: DataTypes.INTEGER(11),
    allowNull: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: DB_TABLES.STATES,
});

States.belongsTo(Country, {
  foreignKey: 'country_id'
});
Country.hasMany(States, {
  foreignKey: 'country_id'
});

module.exports = States;