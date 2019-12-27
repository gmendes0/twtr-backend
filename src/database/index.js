const Sequelize = require('sequelize')
const User = require('../app/models/User')
const Profile = require('../app/models/Profile')
const Post = require('../app/models/Post')
const Comment = require('../app/models/Comment')

const dbconfig = require('../config/database')

const connection = new Sequelize(dbconfig)

User.init(connection)
Profile.init(connection)
Post.init(connection)
Comment.init(connection)

User.associate(connection.models)
Profile.associate(connection.models)
Post.associate(connection.models)
Comment.associate(connection.models)

module.exports = connection
