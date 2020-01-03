const { Model, DataTypes } = require('sequelize')
const bcryptjs = require('bcryptjs')

class User extends Model {
  static init(connection) {
    super.init({
      username: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: 'the username can\'t be empty.'
          },
          len: {
            args: [1, 100],
            msg: 'the username must have between 1 and 100 characters.'
          },
        }
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: 'the email can\'t be empty.'
          },
          isEmail: {
            msg: 'invalid email format.'
          },
        }
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: 'the password can\'t be empty.'
          },
          len: {
            args: [6, 8],
            msg: 'the username must have between 6 and 8 characters.'
          }
        }
      },
      name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: 'the name can\'t be empty.'
          },
          len: {
            args: {
              args: [1, 100],
              msg: 'the name must have between 1 and 100 characters.'
            }
          }
        }
      },
      birth_date: {
        type: DataTypes.DATE,
        validate: {
          notEmpty: {
            msg: 'the birth date can\'t be empty.'
          },
          isDate: {
            msg: 'invalid date.'
          }
        }
      },
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
    this.hasOne(models.Avatar, { foreignKey: 'user_id', as: 'avatar' })
  }
}

module.exports = User
