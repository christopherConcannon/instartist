const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');
const imgUpload = require('../../config/imgUpload');

// GET /api/users
router.get('/', (req, res) => {
	User.findAll({
		attributes : { exclude: [ 'password' ] }
	})
		.then((dbUserData) => res.json(dbUserData))
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

// GET /api/users/1
router.get('/:id', (req, res) => {
	User.findOne({
		attributes : { exclude: [ 'password' ] },
		where      : {
			id : req.params.id
		},
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
			res.json(dbUserData);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

// POST /api/users -- create user on signup
router.post('/', imgUpload.single('user-img'), (req, res) => {
  // check for unique username
	User.findOne({
		where : {
      username: req.body.username
    }
  })
  .then((dbUserData) => {
    if(dbUserData) {
      console.log('Username already used');
      req.flash('error', `Sorry, that username already exists`);
      res.status(409).json({ message: 'Username already exists'});
      return;
    }
    User.create({
      username     : req.body.username,
      email        : req.body.email,
      password     : req.body.password,
      bio          : req.body.bio,
      medium       : req.body.medium,
      interests    : req.body.interests,
      user_img_url : req.file.path
    }).then((dbUserData) => {
      req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;
  
        req.flash('success', `Hi ${req.session.username}, welcome to Instartist!`);
        res.json(dbUserData);
      });
    });
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
  

});

// PUT /api/users/1
router.put('/:id', withAuth, imgUpload.single('user-img'), (req, res) => {
	User.update(
		{
			bio          : req.body.bio,
			medium       : req.body.medium,
			interests    : req.body.interests,
			user_img_url : req.file.path
		},
		{
			// individualHooks : false,
			where : {
				id : req.params.id
			}
		}
	)
		.then((dbUserData) => {
			if (!dbUserData) {
				res.status(404).json({ message: 'No user found with this id' });
				return;
			}
			req.flash('success', 'Your user info has been updated!');
			res.json(dbUserData);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

// DELETE /api/users/1
router.delete('/:id', withAuth, (req, res) => {
	Comment.destroy({
		where : {
			user_id : req.params.id
		}
	}).then(() => {
		Post.destroy({
			where : {
				user_id : req.params.id
			}
		}).then(() => {
			User.destroy({
				where : {
					id : req.params.id
				}
			})
				.then((dbUserData) => {
					if (!dbUserData) {
						res.status(404).json({ message: 'No user found with this id' });
						return;
					}
					res.json(dbUserData);
				})
				.catch((err) => {
					console.log(err);
					res.status(500).json(err);
				});
		});
	});
});

// ERROR RECEIVED WHEN TRYING TO DELETE USER-A IF USER-B HAS COMMENTED ON A USER-A POST.  ALL OTHER DELETE SCENARIOS WORK.  LEARNING ASSISTANT RECOMMENDS REMOVING POST_ID CONSTRAINT IN COMMENT MODEL
// Executing (default): DELETE FROM `comment` WHERE `user_id` = '1'
// Executing (default): DELETE FROM `post` WHERE `user_id` = '1'
// (node:24588) UnhandledPromiseRejectionWarning: SequelizeForeignKeyConstraintError: Cannot delete or update a parent row: a foreign key constraint fails (`instartist_db`.`comment`, CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`) ON UPDATE CASCADE)
//     at Query.formatError (C:\Users\cmcon\Desktop\ut coding program\MODULES\Module-15-and-16-PROJECT-TWO\instartist\node_modules\sequelize\lib\dialects\mysql\query.js:228:16)
//     at Query.run (C:\Users\cmcon\Desktop\ut coding program\MODULES\Module-15-and-16-PROJECT-TWO\instartist\node_modules\sequelize\lib\dialects\mysql\query.js:54:18)    at processTicksAndRejections (internal/process/task_queues.js:97:5)
// (node:24588) UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). To terminate the node process on unhandled promise rejection, use the CLI flag `--unhandled-rejections=strict` (see https://nodejs.org/api/cli.html#cli_unhandled_rejections_mode). (rejection id: 1)
// (node:24588) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.

// POST /api/users/login -- login
router.post('/login', (req, res) => {
	// find user based on username
	User.findOne({
		where : {
			username : req.body.username
		}
	}).then((dbUserData) => {
		if (!dbUserData) {
			res.status(400).json({ message: 'No user with that username!' });
			return;
		}

		// validate password
		const validPassword = dbUserData.checkPassword(req.body.password);

		if (!validPassword) {
			req.flash('error', 'Incorrect credentials');
			res.redirect('/login');
			res.status(400).json({ message: 'Incorrect password!' });
			return;
		}

		// initiate creation of session and grab values for session variables from db
		req.session.save(() => {
			// declare session variables
			req.session.user_id = dbUserData.id;
			req.session.username = dbUserData.username;
			req.session.loggedIn = true;

			req.flash(
				'success',
				`Hi ${req.session.username}, welcome back to Instartist!`
			);
			res.json({ user: dbUserData, message: 'You are now logged in!' });
		});
	});
});

// POST /api/users/logout
// logout -- if user is loggedIn, destroy session variables and reset cookie to clear session, then send res back to client so it can redirect user to homepage
router.post('/logout', (req, res) => {
	if (req.session.loggedIn) {
		// DOESN'T WORK BECAUSE SESSION GETS DESTROYED.  IS THERE ANOTHER WAY TO LOG OUT USER WITHOUT DESTROYING SESSION?
		// req.flash('success', 'You have logged out!');
		req.flash('success', 'You have logged out!');
		req.session.destroy(() => {
			res.status(204).end();
		});
	} else {
		res.status(404).end();
	}
});

module.exports = router;
