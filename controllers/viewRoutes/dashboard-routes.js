const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// GET /dashboard -- redirected on successful login/signup events in public/js/login.js and requested from dashboard button in nav


router.get('/', (req, res) => {
	User.findOne({
		attributes : { exclude: [ 'password' ] },
		where      : {
			username: req.session.username
		},
		include    : [
			{
				model      : Post,
				attributes : [ 'id', 'title','dimension','description','media','img_url', 'created_at' ],
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
            const user = dbUserData.get({ plain: true });
            const posts=user.posts;
            const comments=dbUserData.comments;
            console.log("comentarios",comments)
            console.log('los posts',posts)
            console.log('usuarios desde prueba',user.id)
            // pass data to template
            
			res.render('dashboard', {
                user,
                posts,
                comments,
				loggedIn : true
			});		})
		});





router.get('/', withAuth, (req, res) => {
	Post.findAll({
		where      : {
			// use the ID from the session
			user_id : req.session.user_id
		},
		attributes : [ 'id', 'title','dimension','description','media','img_url', 'created_at' ],
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
				attributes : [ 'username', 'bio', 'medium', 'interests' ]
			}
		]
	})
		.then((dbPostData) => {
			// serialize data before passing to template
      const posts = dbPostData.map((post) => post.get({ plain: true }));

      // console.log(posts);
      const userMeta = {
        username: req.session.username,
        bio: req.session.bio,
        medium: req.session.medium,
        interests: req.session.interests
      }
      
			// render template and pass through db data
			res.render('dashboard', {
        posts,
		    username: req.session.username,
		    user_id:req.session.user_id,
        userMeta,
				loggedIn : true
			});
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

// GET /dashboard/edit/1 -- render post form view by id
router.get('/edit/:id', withAuth, (req, res) => {
	Post.findOne({
		where      : {
			id : req.params.id
		},
		attributes :  [ 'id', 'title','dimension','description','media','img_url', 'created_at' ],
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

// GET /dashboard/new
router.get('/new', withAuth, (req, res) => {
	res.render('add-post', {
    loggedIn : true
  });
});

// GET /dashboard/edit/1
/*router.get('/edit/:id', withAuth, (req, res) => {
	Post.findOne({
		where      : {
			id : req.params.id
		},
		attributes : [ 'id', 'title','upload_img','dimension','description','media','created_at' ],
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
}); */

router.get('/user/:id',withAuth, (req, res)=>{	
	console.log(req.params.id)
	User.findOne({
		where      : {
			id : req.params.id
		},
		include    : [
			{
				model      : Post,
				attributes : [ 'id', 'title','dimension','description','media','img_url', 'created_at' ],
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
			const user = dbUserData.get({ plain: true });
			console.log("user datos",user)
			// pass data to template
			
			res.render('edit-user', {
				user,
				loggedIn : true
			});
		})

		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});	
	
})



// DELETE /api/users/1
router.delete('/user/:id', withAuth, (req, res) => {
	Post.destroy({   //delete post when delete a user
		where:{
			user_id:req.params.id
		}
		
	})
	Comment.destroy({
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

module.exports = router;

