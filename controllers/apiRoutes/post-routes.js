const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');
const imgUpload = require('../../config/imgUpload');

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
	Post.update(
		{
			title       : req.body.title,
			dimension   : req.body.dimensions,
			description : req.body.description,
			media       : req.body.media,
			img_url     : req.file.path
		},
		{
			where : {
				id : req.params.id
			}
		}
	)
		.then((dbPostData) => {
			if (!dbPostData) {
				res.status(404).json({ message: 'No post found with this id' });
				return;
			}
			req.flash('success', 'Your work has been updated!');
			res.json(dbPostData);
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
