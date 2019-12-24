const Post = require('../models/Post')
const User = require('../models/User')

module.exports = {
  async index(request, response) {
    try {
      const posts = await Post.findAll({ include: { association: 'user' }})

      return response.json(posts)
    } catch (error) {
      return response.json({ error })
    }
  },

  async show(request, response) {
    try {
      const { post_id } = request.params

      const post = await Post.findByPk(post_id, { include: { association: 'user' }})

      if (!post)
        return response.json({ error: 'post not found.' })

      return response.json(post)
    } catch (error) {
      return response.json({ error })
    }
  },

  async store(request, response) {
    try {
      const { description } = request.body
      const { user_id } = request
  
      const user = await User.findByPk(user_id)
      
      if (!user)
        return response.json({ error: 'user not found.' })
      
      const post = await Post.create({ description, user_id })
      return response.json(post)
    } catch (error) {
      return response.json({ error })
    }
  },

  async update(request, response) {
    try {
      const { user_id } = request
      const { post_id } = request.params
      const { description } = request.body

      const post = await Post.update({ description }, { where: { id: post_id, user_id }})

      return response.json(post)
    } catch (error) {
      return response.json({ error })
    }
  },

  async destroy(request, response) {
    try {
      const { user_id } = request
      const { post_id } = request.params

      const post = await Post.destroy({ where: { id: post_id, user_id } })

      return response.json(post)
    } catch (error) {
      return response.json({ error })
    }
  }
}