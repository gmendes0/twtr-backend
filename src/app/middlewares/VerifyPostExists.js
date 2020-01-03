const Post = require('../models/Post')

module.exports = {
  async verify(request, response, next) {
    const { post_id } = request.params

    if (!post_id)
      return response.json({ error: 'post not found' })

    const post = await Post.findByPk(post_id)

    if (!post)
      return response.json({ error: 'post not found' })

    next()
  }
}
