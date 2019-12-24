const routes = require('express').Router()

const UserController = require('./app/controllers/UserController')
const ProfileController = require('./app/controllers/ProfileController')
const PostController = require('./app/controllers/PostController')

const Authentication = require('./app/middlewares/Authentication')

routes.post('/register', UserController.register)
routes.post('/login', UserController.login)
routes.post('/profiles', Authentication.Auth, ProfileController.store)
routes.get('/profiles', Authentication.Auth, ProfileController.index)
routes.post('/posts', Authentication.Auth, PostController.store)
routes.get('/posts', PostController.index)
routes.get('/posts/:post_id', PostController.show)
routes.put('/posts/:post_id', Authentication.Auth, PostController.update)
routes.delete('/posts/:post_id', Authentication.Auth, PostController.destroy)

module.exports = routes
