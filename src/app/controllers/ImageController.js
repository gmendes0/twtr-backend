const Image = require('../models/Image')
const Post = require('../models/Post')

module.exports = {
  async store(request, response) {
    try {

      const { post_id } = request.params
      const { originalname, filename, size } = request.file

      const image = await Image.create({ originalname, filename, size, post_id })
      return response.json(image)
    } catch (error) {
      console.log(error)
      return response.json({ error })
    }
  }
}
