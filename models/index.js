const User = require('./Users');
const Post = require('./Posts');
const Reply = require('./Reply');

User.hasMany(Post, {
    foreignKey: 'user_id'
  });
  
  Post.belongsTo(User, {
    foreignKey: 'user_id'
  });

  User.hasMany(Reply, {
    foreignKey: 'user_id'
  });

  Reply.belongsTo(User, {
    foreignKey: 'user_id'
  });

  Post.hasMany(Reply, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE'
  });

  Reply.belongsTo(Post, {
    foreignKey: 'post_id'
  });

module.exports = { User, Post, Reply };