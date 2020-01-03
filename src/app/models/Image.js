const { Model, DataTypes } = require('sequelize')

class Image extends Model {
  static init(connection) {
    super.init({
      filename: DataTypes.STRING,
      originalname: DataTypes.STRING,
      size: DataTypes.INTEGER,
    },{sequelize: connection})
  }

  static associate(models) {
    this.belongsTo(models.Post, { foreignKey: 'post_id', as: 'user' })
  }
}

module.exports = Image
