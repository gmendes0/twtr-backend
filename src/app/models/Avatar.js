const { Model, DataTypes } = require('sequelize')

class Avatar extends Model {
  static init(connection) {
    super.init({
      filename: DataTypes.STRING,
      originalname: DataTypes.STRING,
      size: DataTypes.INTEGER,
    },{sequelize: connection})
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' })
  }
}

module.exports = Avatar
