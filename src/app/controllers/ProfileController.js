const User = require('../models/User')
const Profile = require('../models/Profile')

module.exports = {
  async index(request, response) {
    try {

      const { user_id } = request

      const user = await User.findByPk(user_id, {
        include: { association: 'profile' }
      })

      return response.json(user.profile)
    } catch (error) {
      return response.json({ error })
    }
  },

  async store(request, response) {
    try {
      
      const { user_id } = request
      const { name, phone, birth_date } = request.body
      const user = await User.findByPk(user_id, {
        include: { association: 'profile' }
      })

      if (!user)
        return response.status(400).json({ error: { message: 'User not found.' } })

      if (!user.profile) {
        user.profile = await Profile.create({ name, phone, birth_date, user_id })
      }

      return response.json(user.profile)
    } catch (error) {
      return response.json({ error })
    }
  },
}