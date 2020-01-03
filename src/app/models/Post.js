const { Model, DataTypes } = require('sequelize')

class Post extends Model {
  static init(connection) {
    super.init({
      description: DataTypes.STRING
    }, { sequelize: connection })
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' })
    this.hasMany(models.Comment, { foreignKey: 'post_id', as: 'comments' })
    this.hasMany(models.Image, { foreignKey: 'post_id', as: 'images' })
  }
}

module.exports = Post
