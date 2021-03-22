// const path = require('path');
const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require('./config/config.json')[env];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Member = require('./member/member')(sequelize, Sequelize);

module.exports = db;
