const Post = require('../models/Post')

module.exports = {
  async index(request, response) {
    try {

      const { post_id } = request.params

      const post = await Post.findByPk(post_id, { include: { association: 'comments' }})

      return response.json(post.comments)
    } catch (error) {
      return response.json({ error })
    }
  },
}
