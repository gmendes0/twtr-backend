const Comment = require('../models/Comment')
const Post = require('../models/Post')

module.exports = {
  async show(request, response) {
    try {

      const { comment_id } = request.params

      const comment = await Comment.findByPk(comment_id)

      if (!comment)
        return response.json({ error: 'comment not found.' })

      return response.json(comment)
    } catch (error) {
      return response.json({ error })
    }
  },
  async store(request, response) {
    try {

      const { user_id } = request
      const { post_id } = request.params
      const { content } = request.body

      const post = await Post.findByPk(post_id)

      if (!post)
        return response.json({ error: 'post not found.' })
      
      const comment = await Comment.create({ content, user_id, post_id })

      return response.json(comment)
    } catch (error) {
      return response.json({ error })
    }
  },
  async update(request, response) {
    try {

      const { user_id } = request
      const { comment_id } = request.params
      const { content } = request.body

      const [ updated, comment ] = await Comment.update({ content }, { where: { id: comment_id, user_id }})

      return response.json({ updated, comment })
    } catch (error) {
      return response.json({ error })
    }
  },
  async destroy(request, response) {
    try {

      const { user_id } = request
      const { comment_id } = request.params

      const deleted = await Comment.destroy({ where: { id: comment_id, user_id }})

      return response.json({ deleted })
    } catch (error) {
      return response.json({ error })
    }
  },
}
