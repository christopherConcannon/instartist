const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');
const imgUpload = require('../../config/imgUpload');
const cloudinary = require('cloudinary').v2;

// POST /api/posts
// router.post('/', withAuth, (req, res) => {
router.post('/', withAuth, imgUpload.single('work-img'), (req, res) => {
	console.log('req.file:', req.file);
	console.log('req.body', req.body);
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
// NOTE...NEED TO ADD CONDITIONAL TO CHECK FOR REQ.FILE -- GETTING ERROR IF NO NEW IMAGE UPLOADED

// upload new image to cloudinary in middleware, get back new req.file.path
router.put('/:id', withAuth, imgUpload.single('work-img'), (req, res) => {
	// if there was a picture updated
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
				// console.log('old post data', oldPostData);

				const oldPublicId = oldPostData.get({ plain: true });

				// console.log('old public_id: ', oldPublicId.public_id);
				// console.log('old title: ', oldPublicId.title);

				cloudinary.uploader.destroy(oldPublicId.public_id, (err) => {
					console.log(err);
					console.log(oldPublicId, ' deleted');
				});

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
					// console.log('updated data:', newPostData);
					if (!newPostData) {
						// console.log('no new post data');
						res.status(404).json({ message: 'No post found with this id' });
						return;
					}
					// no logging

					// error...newPostData.get not a function
					// const newData = newPostData.get({ plain: true });
					// console.log('updated public_id: ', newData.public_id);
					// console.log('updated title', newData.title);
					req.flash('success', 'Your work has been updated!');
					res.json(newPostData);
				});
			})
			.catch((err) => {
				console.log(err);
				res.status(500).json(err);
      });
      
	} else {

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
				// console.log('updated data:', newPostData);
				if (!newPostData) {
					// console.log('no new post data');
					res.status(404).json({ message: 'No post found with this id' });
					return;
				}
				// no logging

				// error...newPostData.get not a function
				// const newData = newPostData.get({ plain: true });
				// console.log('updated public_id: ', newData.public_id);
				// console.log('updated title', newData.title);
				req.flash('success', 'Your work has been updated!');
				res.json(newPostData);
			})
			.catch((err) => {
				console.log(err);
				res.status(500).json(err);
			});
	}
});

// router.put('/:id', withAuth, imgUpload.single('work-img'), (req, res) => {
// 	// find old public_id for image so we can delete it from cloudinary before updating the db with new path
// 	Post.findOne(
// 		{
// 			where : {
// 				id : req.params.id
// 			}
// 		},
// 		{
// 			attributes : [ 'title', 'public_id' ]
// 		}
// 	)
// 		.then((oldPostData) => {
// 			// console.log('old post data', oldPostData);

// 			const oldPublicId = oldPostData.get({ plain: true });

// 			// console.log('old public_id: ', oldPublicId.public_id);
// 			// console.log('old title: ', oldPublicId.title);

// 			cloudinary.uploader.destroy(oldPublicId.public_id, (err) => {
// 				console.log(err);
// 				console.log(oldPublicId, ' deleted');
// 			});

// 			Post.update(
// 				{
// 					title       : req.body.title,
// 					artist_name : req.body.artist,
// 					dimension   : req.body.dimensions,
// 					description : req.body.description,
// 					media       : req.body.media,
// 					img_url     : req.file.path,
// 					public_id   : req.file.filename
// 				},
// 				{
// 					where : {
// 						id : req.params.id
// 					}
// 				}
// 			).then((newPostData) => {
// 				// console.log('updated data:', newPostData);
// 				if (!newPostData) {
// 					// console.log('no new post data');
// 					res.status(404).json({ message: 'No post found with this id' });
// 					return;
// 				}
// 				// no logging

// 				// error...newPostData.get not a function
// 				// const newData = newPostData.get({ plain: true });
// 				// console.log('updated public_id: ', newData.public_id);
// 				// console.log('updated title', newData.title);
// 				req.flash('success', 'Your work has been updated!');
// 				res.json(newPostData);
// 			});
// 		})
// 		.catch((err) => {
// 			console.log(err);
// 			res.status(500).json(err);
// 		});
// });

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
		// console.log('old post data', delPostData);

		const delPublicId = delPostData.get({ plain: true });

		// console.log('old public_id: ', delPublicId.public_id);
		// console.log('old title: ', delPublicId.title);

		cloudinary.uploader.destroy(delPublicId.public_id, (err) => {
			// console.log(err);
			// console.log(delPublicId, ' deleted');
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
							res
								.status(404)
								.json({ message: 'No post found with this id' });
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
});

// SAVED AS BACKUP FOR REFACTOR OF ABOVE DELETE ROUTE
// // DELETE /api/posts/1
// router.delete('/:id', withAuth, (req, res) => {
// 	Post.findOne(
// 		{
// 			where : {
// 				id : req.params.id
// 			}
// 		},
// 		{
// 			attributes : [ 'title', 'public_id' ]
// 		}
// 	).then((delPostData) => {
// 		// console.log('old post data', delPostData);

// 		const delPublicId = delPostData.get({ plain: true });

// 		// console.log('old public_id: ', delPublicId.public_id);
// 		// console.log('old title: ', delPublicId.title);

// 		cloudinary.uploader.destroy(delPublicId.public_id, (err) => {
// 			// console.log(err);
// 			// console.log(delPublicId, ' deleted');
// 			Comment.destroy({
// 				where : {
// 					post_id : req.params.id
// 				}
// 			}).then(() => {
// 				Post.destroy({
// 					where : {
// 						id : req.params.id
// 					}
// 				})
// 					.then((dbPostData) => {
// 						if (!dbPostData) {
// 							res
// 								.status(404)
// 								.json({ message: 'No post found with this id' });
// 							return;
// 						}
// 						req.flash('success', 'Your work has been removed!');
// 						res.json(dbPostData);
// 					})
// 					.catch((err) => {
// 						console.log(err);
// 						res.status(500).json(err);
// 					});
// 			});
// 		});
// 	});
// });

module.exports = router;
