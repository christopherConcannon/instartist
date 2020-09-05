const router = require('express').Router();
const { Post, User, Comment } = require('../../models');

// '/' landing page
router.get('/', (req, res) => {
	res.render('landing', { layout: 'landing', loggedIn: req.session.loggedIn });
});

// '/homepage' homepage -- display index of all posts
router.get('/homepage', (req, res) => {
	Post.findAll({
		attributes : [
			'id',
			'title',
			'dimension',
			'description',
			'media',
			'img_url',
			'created_at'
		],
		order      : [ [ 'created_at', 'DESC' ] ],
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
			const posts = dbPostData.map((post) => post.get({ plain: true }));
			res.render('homepage', {
				posts,
				loggedIn : req.session.loggedIn
			});
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

// GET /post/1 -- single-post
router.get('/post/:id', (req, res) => {
	Post.findOne({
		where      : {
			id : req.params.id
		},
		attributes : [
			'id',
      'title',
      'artist_name',
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
			console.log(post);

			// pass data to template
			res.render('single-post', {
				post,
				loggedIn : req.session.loggedIn
			});
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

// signup
router.get('/signup', (req, res) => {
	// check session variable...if user is logged in redirect to homepage
	if (req.session.loggedIn) {
		res.redirect('/');
		return;
	}
	// otherwise render login page
	res.render('signup');
});

// login
router.get('/login', (req, res) => {
	// check session variable...if user is logged in redirect to homepage
	if (req.session.loggedIn) {
		res.redirect('/');
		return;
	}
	// otherwise render login page
	res.render('login');
});

module.exports = router;
