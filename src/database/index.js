const Sequelize = require('sequelize')
const User = require('../app/models/User')

const dbconfig = require('../config/database')

const connection = new Sequelize(dbconfig)

User.init(connection)

module.exports = connection
