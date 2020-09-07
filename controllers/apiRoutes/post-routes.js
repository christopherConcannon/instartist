const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');
const imgUpload = require('../../config/imgUpload');
const cloudinary = require('cloudinary').v2;

// POST /api/posts
router.post('/', withAuth, imgUpload.single('work-img'), (req, res) => {
	Post.create({
		title       : req.body.title,
		artist_name : req.body.artist,
		dimension   : req.body.dimensions,
		description : req.body.description,
		media       : req.body.media,
		img_url     : req.file.path,
		public_id   : req.file.filename,
		user_id     : req.session.user_id
	})
		.then((dbPostData) => {
			console.log('dbPostData: ', dbPostData);
			req.flash('success', 'Your new work has been added!');
			res.json(dbPostData);
		})
		.catch((err) => {
			console.log(err);
			req.flash(
				'error',
				'There was a problem, your new work could not be added. Please try again later.'
			);
			res.status(500).json(err);
		});
});

// PUT /api/posts/1
// upload new image to cloudinary in middleware, get back new req.file.path
router.put('/:id', withAuth, imgUpload.single('work-img'), (req, res) => {
	// if there was a picture updated -- NOTE THIS TECHNIQUE IS NOT DRY, IS THERE A WAY TO REFACTOR?
	if (req.file) {
		// find old public_id for image so we can delete it from cloudinary before updating the db with new path
		Post.findOne(
			{
				where : {
					id : req.params.id
				}
			},
			{
				attributes : [ 'title', 'public_id' ]
			}
		)
			.then((oldPostData) => {
				const oldPublicId = oldPostData.get({ plain: true });

				// remove old image from cloudinary db
				cloudinary.uploader.destroy(oldPublicId.public_id, (err) => {
					console.log(err);
					console.log(oldPublicId, ' deleted');
				});

				// not in cloudinary callback since deletion from cloudinary is not critical to UX
				Post.update(
					{
						title       : req.body.title,
						artist_name : req.body.artist,
						dimension   : req.body.dimensions,
						description : req.body.description,
						media       : req.body.media,
						img_url     : req.file.path,
						public_id   : req.file.filename
					},
					{
						where : {
							id : req.params.id
						}
					}
				).then((newPostData) => {
					if (!newPostData) {
						res.status(404).json({ message: 'No post found with this id' });
						return;
					}

					req.flash('success', 'Your work has been updated!');
					res.json(newPostData);
				});
			})
			.catch((err) => {
				console.log(err);
				res.status(500).json(err);
			});
	} else {
		// no new picture to update, just update db
		Post.update(
			{
				title       : req.body.title,
				artist_name : req.body.artist,
				dimension   : req.body.dimensions,
				description : req.body.description,
				media       : req.body.media
			},
			{
				where : {
					id : req.params.id
				}
			}
		)
			.then((newPostData) => {
				if (!newPostData) {
					res.status(404).json({ message: 'No post found with this id' });
					return;
				}
				req.flash('success', 'Your work has been updated!');
				res.json(newPostData);
			})
			.catch((err) => {
				console.log(err);
				res.status(500).json(err);
			});
	}
});

// DELETE /api/posts/1
router.delete('/:id', withAuth, (req, res) => {
	Post.findOne(
		{
			where : {
				id : req.params.id
			}
		},
		{
			attributes : [ 'title', 'public_id' ]
		}
	).then((delPostData) => {
		const delPublicId = delPostData.get({ plain: true });

		cloudinary.uploader.destroy(delPublicId.public_id, (err) => {
			console.log(err);
			console.log(delPublicId, ' deleted');
		});

		Comment.destroy({
			where : {
				post_id : req.params.id
			}
		}).then(() => {
			Post.destroy({
				where : {
					id : req.params.id
				}
			})
				.then((dbPostData) => {
					if (!dbPostData) {
						res.status(404).json({ message: 'No post found with this id' });
						return;
					}
					req.flash('success', 'Your work has been removed!');
					res.json(dbPostData);
				})
				.catch((err) => {
					console.log(err);
					res.status(500).json(err);
				});
		});
	});
});

module.exports = router;
