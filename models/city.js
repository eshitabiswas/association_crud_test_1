const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const { DB_TABLES } = require('../config/constant');

const Countries = require('../models/country')
const States = require('../models/state')

const Cities = sequelize.define(DB_TABLES.CITIES, {
  id: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  city_name: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  country_id: {
    type: DataTypes.INTEGER(11),
    allowNull: true,
  },
  state_id: {
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
  tableName: DB_TABLES.CITIES,
});

Cities.belongsTo(States, {
  foreignKey: 'state_id'
});
States.hasMany(Cities, {
  foreignKey: 'state_id'
});

Cities.belongsTo(Countries, {
  foreignKey: 'country_id'
});
Countries.hasMany(Cities, {
  foreignKey: 'country_id'
});

module.exports = Cities;