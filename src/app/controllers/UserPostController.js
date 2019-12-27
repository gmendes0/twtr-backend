const User = require('../models/User')

module.exports = {
  async index(request, response) {
    try {

      const { user_id } = request

      const user = await User.findByPk(user_id, { include: { association: 'posts' }})

      return response.json(user.posts)
    } catch (error) {
      return response.json({ error })
    }
  },
}
