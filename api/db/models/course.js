const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Course extends Model {}
  Course.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Please provide a value for 'Title'" },
        notNull: { msg: "Please provide a value for 'Title'"}
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Please provide a value for 'Description'" },
        notNull: { msg: "Please provide a value for 'Description'"}
      }
    },
    estimatedTime: {
      type: DataTypes.STRING,
    },
    materialsNeeded: {
      type: DataTypes.STRING,
    },
  }, { sequelize });

  Course.associate = (models) => {
    Course.belongsTo(models.User, {
      foreignKey: {
        fieldName: 'userId',
        allowNull: false,
        default: -1,
      },
    });
  };

  return Course;
}
