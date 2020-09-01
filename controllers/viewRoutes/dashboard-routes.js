const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// GET /dashboard -- redirected on successful login/signup events in public/js/login.js and requested from dashboard button in nav

// maybe need to refactor to query user by id then pass posts in to template so that we don't have to populate user meta by req.session.vars because that is why dashboard is not populating with updated user meta data when the user is edited.  then we'll have to refactor dashboard.handlebars to access the right data
router.get('/', withAuth, (req, res) => {
	User.findOne({
		where      : {
			user_id : req.session.user_id
		},
		attributes : [
      'username', 
      'bio', 
      'medium',
      'interests'
    ],
    include: [
      {
        model: Post,
        attributes: ['title', 'dimension', 'description', 'media', 'img_url' ]
      }
    ]
  })
  .then((dbUserData) => {
    const user = 
  })
});
// router.get('/', withAuth, (req, res) => {
// 	Post.findAll({
// 		where      : {
// 			// use the ID from the session
// 			user_id : req.session.user_id
// 		},
// 		attributes : [
// 			'id',
// 			'title',
// 			'dimension',
// 			'description',
// 			'media',
// 			'img_url',
// 			'created_at'
// 		],
// 		order      : [ [ 'created_at', 'DESC' ] ],
// 		include    : [
// 			{
// 				model      : Comment,
// 				attributes : [ 'id', 'comment_text', 'post_id', 'user_id', 'created_at' ],
// 				include    : {
// 					model      : User,
// 					attributes : [ 'username' ]
// 				}
// 			},
// 			{
// 				model      : User,
// 				attributes : [ 'username', 'bio', 'medium', 'interests' ]
// 			}
// 		]
// 	})
// 		.then((dbPostData) => {
// 			// serialize data before passing to template
// 			const posts = dbPostData.map((post) => post.get({ plain: true }));

// 			// // console.log(posts);
// 			const userMeta = {
// 				username  : req.session.username,
// 				bio       : req.session.bio,
// 				medium    : req.session.medium,
// 				interests : req.session.interests
// 			};

// 			// render template and pass through db data
// 			res.render('dashboard', {
// 				posts,
// 				username : req.session.username,
// 				user_id  : req.session.user_id,
// 				userMeta,
// 				loggedIn : true
// 			});
// 		})
// 		.catch((err) => {
// 			console.log(err);
// 			res.status(500).json(err);
// 		});
// });

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
