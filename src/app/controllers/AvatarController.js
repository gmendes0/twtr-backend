const Avatar = require('../models/Avatar')
const User = require('../models/User')

module.exports = {
  async store(request, response) {
    try {

      const { user_id } = request
      const { originalname, size, filename } = request.file
      const avatar = await Avatar.create({ originalname, size, filename, user_id })

      return response.json(avatar)
    } catch (error) {
      return response.json({ error })
    }
  },
}
