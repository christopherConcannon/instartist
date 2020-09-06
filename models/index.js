const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

//asociations between models
// *****one to many******
User.hasMany(Post, {
	foreignKey : 'user_id'
});

Post.belongsTo(User, {
	foreignKey : 'user_id'
});
// ************************

// Comment : User
Comment.belongsTo(User, {
	foreignKey : 'user_id',
  onDelete   : 'CASCADE',
  onUpdate: 'CASCADE'
});

User.hasMany(Comment, {
  foreignKey : 'user_id',
  onDelete   : 'CASCADE',
  onUpdate: 'CASCADE'
});
// ***********************


// Comment : Post
Comment.belongsTo(Post, {
  foreignKey : 'post_id',
  onDelete   : 'CASCADE',
  onUpdate: 'CASCADE'
});

Post.hasMany(Comment, {
	foreignKey : 'post_id',
  onDelete   : 'CASCADE',
  onUpdate: 'CASCADE'
});
// ***********************

module.exports = { User, Post, Comment };
