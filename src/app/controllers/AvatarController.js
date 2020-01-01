const Avatar = require('../models/Avatar')
const User = require('../models/User')

module.exports = {
  async store(request, response) {
    try {

      const { user_id } = request
      const { originalname, size, filename } = request.file
      const user = await User.findByPk(user_id, { include: { association: 'avatar' }})

      if (!user.avatar) {
        const avatar = await Avatar.create({ originalname, size, filename, user_id })
      }

      return response.json(user.avatar ? user.avatar : avatar)
    } catch (error) {
      console.log(error)
      return response.json({ error })
    }
  },
}
