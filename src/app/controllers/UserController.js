const User = require('../models/User')
const bcryptjs = require('bcryptjs')
const secret = require('../../config/jwt')
const jwt = require('jsonwebtoken')

function generateToken(payload = {}) {
  return jwt.sign(payload, secret.secret, { expiresIn: 86400 })
}

module.exports = {
  async register(request, response) {
    try {
      const { email, password } = request.body

      const user = await User.create({ email, password })
  
      const token = generateToken({ id:  user.id  })
      return response.json({ user, token })
    } catch (error) {
      console.log(error)
      return response.json({error: error})
    }
  },

  async login(request, response) {
    try {
      const { email, password } = request.body

      const user = await User.findOne({ email })

      if (!user)
        return response.status(404).json({ error: { message: 'user not found.' }})
      if (!await bcryptjs.compare(password, user.password)) {
        return response.status(401).json({ error: { message: 'the credentials do not match with our records.' } })
      } else {
        const token = generateToken({ id: user.id })
        return response.json({ user, token })
      }
    } catch (error) {
      console.log(error)
      return response.json({ error: error.message })
    }
  }
}
