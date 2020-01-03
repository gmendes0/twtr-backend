const fs = require('fs')
const path = require('path')
const { promisify } = require('util')

const { Model, DataTypes } = require('sequelize')

class Avatar extends Model {
  static init(connection) {
    super.init({
      filename: DataTypes.STRING,
      originalname: DataTypes.STRING,
      size: DataTypes.INTEGER,
      url: DataTypes.STRING,
    },{
      sequelize: connection,
      hooks: {
        beforeSave: async (avatar) => {
          avatar.url = `${process.env.APP_URL}/avatars/${avatar.filename}`
        },
        beforeDestroy: async (avatar) => {
          await promisify(fs.unlink)(path.resolve(__dirname, '..', '..', '..', 'uploads', 'avatars', avatar.filename))
        }
      }
    })
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' })
  }
}

module.exports = Avatar
