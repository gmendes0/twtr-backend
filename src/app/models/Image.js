const fs = require('fs')
const path = require('path')
const { promisify } = require('util')

const { Model, DataTypes } = require('sequelize')

class Image extends Model {
  static init(connection) {
    super.init({
      filename: DataTypes.STRING,
      originalname: DataTypes.STRING,
      size: DataTypes.INTEGER,
      url: DataTypes.STRING,
    },{
      hooks: {
        beforeSave: async (image) => {
          image.url = `${process.env.APP_URL}/images/${image.filename}`
        },
        beforeDestroy: async (image) => {
          await promisify(fs.unlink)(path.resolve(__dirname, '..', '..', '..', 'uploads', 'posts', image.filename))
        }
      },
      sequelize: connection
    })
  }

  static associate(models) {
    this.belongsTo(models.Post, { foreignKey: 'post_id', as: 'post' })
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' })
  }
}

module.exports = Image
