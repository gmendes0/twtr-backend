const { Model, DataTypes } = require('sequelize')

class Profile extends Model {
  static init(connection) {
    super.init({
      name: DataTypes.STRING,
      phone: DataTypes.STRING,
      birth_date: DataTypes.DATE,
    }, { sequelize: connection })
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' })
  }
}

module.exports = Profile
