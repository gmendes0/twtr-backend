const User = require('../models/User')

module.exports = {
  async register(request, response) {
    try {
      const { email, password } = request.body

      const user = await User.create({ email, password })
  
      return response.json(user)
    } catch (error) {
      console.log(error)
      return response.json({error: error})
    }
  },
}
