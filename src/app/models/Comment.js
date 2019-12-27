const { Model, DataTypes } = require('sequelize')

class Comment extends Model {
  static init(connection) {
    super.init({
      content: DataTypes.STRING
    }, { sequelize: connection })
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' })
    this.belongsTo(models.Post, { foreignKey: 'post_id', as: 'post' })
  }
}

module.exports = Comment
