const { Model, DataTypes } = require('sequelize')
const bcryptjs = require('bcryptjs')

class User extends Model {
  static init(connection) {
    super.init({
      email: DataTypes.STRING,
      password: DataTypes.STRING
    }, {
      hooks: {
        beforeCreate: async (user) => {
          user.password = await bcryptjs.hash(user.password, 10)
        }
      },
      sequelize: connection
    })
  }
}

module.exports = User
