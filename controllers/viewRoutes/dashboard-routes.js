const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// GET /dashboard -- redirected on successful login/signup events in public/js/login.js and requested from dashboard button in nav

//  Executing (default): SELECT `user`.`id`, `user`.`username`, `user`.`bio`, `user`.`medium`, `user`.`interests`, `user`.`user_img_url`, `posts`.`id` AS `posts.id`, `posts`.`title` AS `posts.title`, `posts`.`dimension` AS `posts.dimension`, `posts`.`description` AS `posts.description`, `posts`.`media` AS `posts.media`, `posts`.`img_url` AS `posts.img_url`, `posts`.`created_at` AS `posts.created_at` FROM `user` AS `user` LEFT OUTER JOIN `post` AS `posts` ON `user`.`id` = `posts`.`user_id` WHERE `user`.`id` = 11 ORDER BY `posts`.`created_at` DESC;
// TypeError: Cannot read property 'get' of null
// at C:\Users\cmcon\Desktop\ut coding program\MODULES\Module-15-and-16-PROJECT-TWO\instartist\controllers\viewRoutes\dashboard-routes.js:22:28
// at processTicksAndRejections (internal/process/task_queues.js:97:5)
router.get('/', withAuth, (req, res) => {
	User.findOne({
		where      : {
			id : req.session.user_id
		},
		attributes : [ 'id', 'username', 'bio', 'medium', 'interests', 'user_img_url' ],
		include    : [
			{
				model      : Post,
				attributes : [
					'id',
					'title',
					'dimension',
					'description',
					'media',
					'img_url',
					'created_at'
				]
			}
		],
		// To order by the attributes of an include, you don't put the order attribute inside the include - it has to go at the root of the options. You specify an array which traces it's way through the includes.
		order      : [ [ Post, 'created_at', 'DESC' ] ]
	})
		.then((dbUserData) => {
			const user = dbUserData.get({ plain: true });
			// console.log('user: ', user);

			res.render('dashboard', {
				user,
				loggedIn : true
			});
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

// GET /dashboard/edit/1 -- render post edit form view by id
router.get('/edit/:id', withAuth, (req, res) => {
	Post.findOne({
		where      : {
			id : req.params.id
		},
		attributes : [
			'id',
			'title',
			'dimension',
			'description',
			'media',
			'img_url',
			'created_at'
		],
		include    : [
			{
				model      : Comment,
				attributes : [ 'id', 'comment_text', 'post_id', 'user_id', 'created_at' ],
				include    : {
					model      : User,
					attributes : [ 'username' ]
				}
			},
			{
				model      : User,
				attributes : [ 'username' ]
			}
		]
	})
		.then((dbPostData) => {
			if (!dbPostData) {
				res.status(404).json({ message: 'No post found with this id' });
				return;
			}

			// serialize the data
			const post = dbPostData.get({ plain: true });

			// pass data to template
			res.render('edit-post', {
				post,
				loggedIn : true
			});
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

// GET /dashboard/new -- render form to add new post
router.get('/new', withAuth, (req, res) => {
	res.render('add-post', {
		loggedIn : true
	});
});

// GET /dashboard/user/:id -- render form to edit user
router.get('/user/:id', withAuth, (req, res) => {
	console.log(req.params.id);
	User.findOne({
		where   : {
			id : req.params.id
		},
		include : [
			{
				model      : Post,
				attributes : [
					'id',
					'title',
					'dimension',
					'description',
					'media',
					'img_url',
					'created_at'
				]
			},
			{
				model      : Comment,
				attributes : [ 'id', 'comment_text', 'created_at' ],
				include    : {
					model      : Post,
					attributes : [ 'title' ]
				}
			}
		]
	})
		.then((dbUserData) => {
			if (!dbUserData) {
				res.status(404).json({ message: 'No user found with this id' });
				return;
			}
			const userMeta = dbUserData.get({ plain: true });
			// console.log("user datos", userMeta)
			// pass data to template
			res.render('edit-user', {
				userMeta,
				loggedIn : true
			});
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

// this is the dashboard routes for views!  this should not be here...path will be /dashboard/etc not /api/etc.  user related routes should be in api/user-routes.js

// // DELETE /api/users/1
// router.delete('/user/:id', withAuth, (req, res) => {
// 	Post.destroy({   //delete post when delete a user
// 		where:{
// 			user_id: req.params.id
// 		}

// 	})
// 	Comment.destroy({
// 		where : {
// 			user_id : req.params.id
// 		}
// 	}).then(() => {
// 		User.destroy({
// 			where : {
// 				id : req.params.id
// 			}
// 		})
// 			.then((dbUserData) => {
// 				if (!dbUserData) {
// 					res.status(404).json({ message: 'No user found with this id' });
// 					return;
// 				}
// 				res.json(dbUserData);
// 			})
// 			.catch((err) => {
// 				console.log(err);
// 				res.status(500).json(err);
// 			});
// 	});
// });

module.exports = router;
