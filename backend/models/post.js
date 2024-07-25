'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.user, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE'
      });
   
      Post.belongsToMany(models.user, {
        through: 'Like',
        as:'like',
        foreignKey: 'post_id',
        onDelete: 'CASCADE',
      })
      Post.hasMany(models.Like, { foreignKey: 'post_id',});

    }
  }
  Post.init({
    user_id: DataTypes.INTEGER,
    url: DataTypes.STRING,
    description: DataTypes.STRING,
    title: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};