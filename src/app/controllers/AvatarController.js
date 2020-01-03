const Avatar = require('../models/Avatar')
const User = require('../models/User')

module.exports = {
  async store(request, response) {
    try {

      const { user_id } = request
      const { originalname, size, filename } = request.file
      const user = await User.findByPk(user_id, { include: { association: 'avatar' }})

      if (!user)
        return response.json({ error: 'user not found.' })

      if (!user.avatar) {
        const avatar = await Avatar.create({ originalname, size, filename, user_id })
        return response.json(avatar)
      }

      return response.json(user.avatar ? user.avatar : avatar)
    } catch (error) {
      return response.json({ error })
    }
  },
  async destroy(request, response) {
    try {

      const { user_id } = request
      const { avatar_id } = request.params

      const avatar = await Avatar.findByPk(avatar_id, { where: { user_id }})

      if (!avatar)
        throw new Error('avatar not found.')

      await avatar.destroy()
      return response.json()
    } catch (error) {
      return response.json({ error: error.message })
    }
  }
}
