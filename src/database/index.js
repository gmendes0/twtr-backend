const Sequelize = require('sequelize')
const User = require('../app/models/User')
const Profile = require('../app/models/Profile')

const dbconfig = require('../config/database')

const connection = new Sequelize(dbconfig)

User.init(connection)
Profile.init(connection)

User.associate(connection.models)
Profile.associate(connection.models)

module.exports = connection
