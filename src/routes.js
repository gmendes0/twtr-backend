const routes = require('express').Router()
const multer = require('multer')

const avatarsConfig = require('./config/multer_avatars')
const postImageConfig = require('./config/multer_posts')

const UserController = require('./app/controllers/UserController')
const PostController = require('./app/controllers/PostController')
const CommentController = require('./app/controllers/CommentController')
const PostCommentController = require('./app/controllers/PostCommentController')
const UserPostController = require('./app/controllers/UserPostController')
const AvatarController = require('./app/controllers/AvatarController')
const ImageController = require('./app/controllers/ImageController')

const Authentication = require('./app/middlewares/Authentication')
const VerifyPostExists = require('./app/middlewares/VerifyPostExists')

routes.post('/register', UserController.register)
routes.post('/login', UserController.login)
routes.post('/posts', Authentication.Auth, PostController.store)
routes.get('/posts', PostController.index)
routes.get('/posts/:post_id', PostController.show)
routes.put('/posts/:post_id', Authentication.Auth, PostController.update)
routes.delete('/posts/:post_id', Authentication.Auth, PostController.destroy)
routes.post('/posts/:post_id/comments', Authentication.Auth, CommentController.store)
routes.get('/comments/:comment_id', CommentController.show)
routes.put('/comments/:comment_id', Authentication.Auth, CommentController.update)
routes.delete('/comments/:comment_id', Authentication.Auth, CommentController.destroy)
routes.get('/posts/:post_id/comments', PostCommentController.index)
routes.get('/users/posts', Authentication.Auth, UserPostController.index)
routes.post('/users/avatars', Authentication.Auth, multer(avatarsConfig).single('file'), AvatarController.store)
routes.post('/posts/:post_id/images', Authentication.Auth, VerifyPostExists.verify, multer(postImageConfig).single('file'), ImageController.store)

module.exports = routes
