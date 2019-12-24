const { Model, DataTypes } = require('sequelize')

class Post extends Model {
  static init(connection) {
    super.init({
      description: DataTypes.STRING
    }, { sequelize: connection })
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' })
  }
}

module.exports = Post
