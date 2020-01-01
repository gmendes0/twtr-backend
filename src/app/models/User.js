const { Model, DataTypes } = require('sequelize')
const bcryptjs = require('bcryptjs')

class User extends Model {
  static init(connection) {
    super.init({
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      name: DataTypes.STRING,
      birth_date: DataTypes.DATE,
    }, {
      hooks: {
        beforeCreate: async (user) => {
          user.password = await bcryptjs.hash(user.password, 10)
        }
      },
      sequelize: connection
    })
  }

  static associate(models) {
    this.hasMany(models.Post, { foreignKey: 'user_id', as: 'posts' })
  }
}

module.exports = User
