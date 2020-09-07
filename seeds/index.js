const seedUsers = require('./user-seeds');
const seedPosts = require('./post-seeds');
const seedComments = require('./comment-seeds');

const sequelize = require('../config/connection');

// NOTE -- this appears to sync the models as well so running $ node seeds/index.js is sufficient to update models when they've been changed
const seedAll = async () => {
	await sequelize.sync({ force: true });
	console.log('--------------');
	await seedUsers();
	console.log('--------------');

	await seedPosts();
	console.log('--------------');

	await seedComments();
	console.log('--------------');

	process.exit(0);
};

seedAll();
