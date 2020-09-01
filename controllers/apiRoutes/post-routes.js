const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');
const imgUpload = require('../../config/imgUpload');
const cloudinary = require('cloudinary').v2;

// POST /api/posts
// router.post('/', withAuth, (req, res) => {
router.post('/', withAuth, imgUpload.single('work-img'), (req, res) => {
	console.log(req.file);
	console.log(req.body);
	Post.create({
		title       : req.body.title,
		dimension   : req.body.dimensions,
		description : req.body.description,
		media       : req.body.media,
		img_url     : req.file.path,
		public_id   : req.file.filename,
		user_id     : req.session.user_id
	})
		.then((dbPostData) => {
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
router.put('/:id', withAuth, imgUpload.single('work-img'), (req, res) => {
	Post.findOne(
		{
			attributes : [ 'title', 'public_id' ]
		},
		{
			where : {
				id : req.params.id
			}
		}
	)
		.then((oldPostData) => {
			console.log('old post data', oldPostData);

			const oldPublicId = oldPostData.get({ plain: true });
			console.log('old public_id: ', oldPublicId.public_id);
			console.log('old title: ', oldPublicId.title);
			cloudinary.uploader.destroy(oldPublicId.public_id, () => {
				console.log(oldPublicId, ' deleted');
			});
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});

	Post.update(
		{
			title       : req.body.title,
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
	)
		.then((newPostData) => {
			if (!newPostData) {
				console.log('no new post data');
				res.status(404).json({ message: 'No post found with this id' });
				return;
			}
			// console.log('updated data:', newPostData);
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
});

// DELETE /api/posts/1
router.delete('/:id', withAuth, (req, res) => {
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

module.exports = router;
