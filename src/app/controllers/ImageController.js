const Image = require('../models/Image')
const Post = require('../models/Post')

module.exports = {
  async store(request, response) {
    try {

      const { user_id } = request
      const { post_id } = request.params
      const { originalname, filename, size } = request.file

      const image = await Image.create({ originalname, filename, size, post_id, user_id })
      return response.json(image)
    } catch (error) {
      return response.json({ error })
    }
  },

  async destroy(request, response) {
    try {

      const { user_id } = request
      const { image_id } = request.params

      const image = await Image.findByPk(image_id, { where: { user_id }})

      if (!image)
        throw new Error('image not found.')

      await image.destroy()
      return response.json()
    } catch (error) {
      return response.json({ error: error.message })
    }
  }
}
