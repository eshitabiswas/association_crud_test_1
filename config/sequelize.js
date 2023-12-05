const Sequelize = require('sequelize');

const sequelize = new Sequelize('association', 'root', '', {
    host: 'localhost',
    dialect: "mysql"
});


module.exports = sequelize;