const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}

Post.init(
	{
		id          : {
			type          : DataTypes.INTEGER,
			allowNull     : false,
			primaryKey    : true,
			autoIncrement : true
		},
		title       : {
			type      : DataTypes.STRING,
			allowNull : false
		},
		artist_name : {
			type      : DataTypes.STRING,
			allowNull : false
		},
		dimension   : {
			type      : DataTypes.STRING,
			allowNull : false
		},
		description : {
			type      : DataTypes.STRING,
			allowNull : false
		},
		media       : {
			type      : DataTypes.STRING,
			allowNull : false
		},
		img_url     : {
			type      : DataTypes.STRING,
			allowNull : false,
			validate  : {
				isUrl : true
			}
		},
		// file name of image in Cloudinary, needed for deleting
		public_id   : {
			type      : DataTypes.STRING,
			allowNull : false
		},
		user_id     : {
			type       : DataTypes.INTEGER,
			references : {
				model : 'user',
				key   : 'id'
			}
		}
	},
	{
		sequelize,
		freezeTableName : true,
		underscored     : true,
		modelName       : 'post'
	}
);

module.exports = Post;
