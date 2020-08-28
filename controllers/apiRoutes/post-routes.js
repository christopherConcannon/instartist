const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// POST /api/posts
router.post('/', withAuth, (req, res) => {
	Post.create({
		title: req.body.title,
		upload_img: req.body.upload_img,
		dimension: req.body.dimension,
		description: req.body.description,
		media: req.body.media,
		user_id: req.session.user_id
	})
		.then((dbPostData) => res.json(dbPostData))		
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

// PUT /api/posts/1
router.put('/:id', (req, res) => {
	Post.update(
		{
			title: req.body.title,
			upload_img: req.body.upload_img,
			dimension: req.body.dimension,
			description: req.body.description,
			media: req.body.media,
		},
		{
			where: {
				id: req.params.id
			}
		}
	)
		.then((dbPostData) => {
			if (!dbPostData) {
				res.status(404).json({ message: 'No post found with this id' });
				return;
			}
			res.json(dbPostData);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

// DELETE /api/posts/1
router.delete('/:id', withAuth, (req, res) => {
	Post.destroy({
		where: {
			id: req.params.id
		}
	})
		.then((dbPostData) => {
			if (!dbPostData) {
				res.status(404).json({ message: 'No post found with this id' });
				return;
			}
			res.json(dbPostData);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

module.exports = router;
