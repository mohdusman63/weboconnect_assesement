'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Like.belongsTo(models.user, { foreignKey: 'user_id' });
      Like.belongsTo(models.Post, { foreignKey: 'post_id' });
    }
  }
  Like.init({
    post_id:  {
      type: DataTypes.INTEGER,
      allowNull: false,
      // references: {
      //   model: 'Users',
      //   key: 'id'
      // },
     
    },
    user_id:  {
      type: DataTypes.INTEGER,
      allowNull: false,
      // references: {
      //   model: 'Posts',
      //   key: 'id'
      // },
      
    }
  }, {
    sequelize,
    modelName: 'Like',
  });
  return Like;
};