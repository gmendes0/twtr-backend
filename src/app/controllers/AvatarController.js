const fs = require('fs')
const path = require('path')
const { promisify } = require('util')

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
  async update(request, response) {
    try {

      const { user_id } = request
      const { avatar_id } = request.params
      const { originalname, size, filename } = request.file

      const avatar = await Avatar.findByPk(avatar_id, { where: { user_id }})

      if (!avatar)
        throw new Error('avatar not found.')

      const oldfilename = avatar.filename

      if (await avatar.update({ originalname, size, filename })) {
        if (await promisify(fs.exists)(path.resolve(__dirname, '..', '..', '..', 'uploads', 'avatars', oldfilename)))
          await promisify(fs.unlink)(path.resolve(__dirname, '..', '..', '..', 'uploads', 'avatars', oldfilename))
      }

      return response.json(avatar)
    } catch (error) {
      return response.json({ error: error.message })
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
