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
	// build object to pass to Post.update
	const postObj = {
		title       : req.body.title,
		artist_name : req.body.artist,
		dimension   : req.body.dimensions,
		description : req.body.description,
		media       : req.body.media
	};

	// if there was a picture updated
	if (req.file) {
		postObj.img_url = req.file.path;
		postObj.public_id = req.file.filename;
	}

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
			const oldPublicData = oldPostData.get({ plain: true });

			// remove old image from cloudinary db
			cloudinary.uploader.destroy(oldPublicData.public_id, (err) => {
				if (err)
					console.log(
						err,
						'Oops...Something went wrong with Cloudinary, try manually deleting.'
					);
				console.log(oldPublicData.public_id, ' deleted');
			});
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});

	// update db with new post data
	Post.update(postObj, {
		where : {
			id : req.params.id
		}
	})
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
});

// DELETE /api/posts/1
router.delete('/:id', withAuth, (req, res) => {
	// delete from cloudinary with old public_id before deleting
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
			if (err)
				console.log(
					err,
					'Oops...Something went wrong with Cloudinary, try manually deleting.'
				);
			console.log(delPublicId.public_id, ' deleted');
		});
	});

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

module.exports = router;
