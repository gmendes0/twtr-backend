const routes = require('express').Router()

const UserController = require('./app/controllers/UserController')

routes.post('/register', UserController.register)

module.exports = routes
