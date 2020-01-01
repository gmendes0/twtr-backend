const Sequelize = require('sequelize')
const User = require('../app/models/User')
const Post = require('../app/models/Post')
const Comment = require('../app/models/Comment')
const Avatar = require('../app/models/Avatar')

const dbconfig = require('../config/database')

const connection = new Sequelize(dbconfig)

User.init(connection)
Post.init(connection)
Comment.init(connection)
Avatar.init(connection)

User.associate(connection.models)
Post.associate(connection.models)
Comment.associate(connection.models)
Avatar.associate(connection.models)

module.exports = connection
