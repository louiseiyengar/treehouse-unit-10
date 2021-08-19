const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class User extends Model {}
  User.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Please provide a value for 'First Name'" },
        notNull: { msg: "Please provide a value for 'First Name'"}
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Please provide a value for 'Last Name'" },
        notNull: { msg: "Please provide a value for 'Last Name'"}
      }
    },
    emailAddress: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: { msg: "Please provide a value for 'Email Address'" },
        notNull: { msg: "Please provide a value for 'Email Address'"},
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Please provide a password of at least 4 characters" },
        notNull: { msg: "Please provide a password of at least 4 characters" }
      }
    }
  }, { sequelize });

  User.associate = (models) => {
    User.hasMany(models.Course, {
      foreignKey: {
        fieldName: 'userId',
        allowNull: false,
        default: -1,
      },
    });
  };

  return User;
}
