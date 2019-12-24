const routes = require('express').Router()

const UserController = require('./app/controllers/UserController')
const ProfileController = require('./app/controllers/ProfileController')

routes.post('/register', UserController.register)
routes.post('/login', UserController.login)
routes.post('/users/:user_id/profiles', ProfileController.store)
routes.get('/users/:user_id/profiles', ProfileController.index)

module.exports = routes
