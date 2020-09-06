const { Post } = require('../models');

// if needed
// 'https://source.unsplash.com/1080x960/?art'

const postdata = [
	{
		title       : 'Donec posuere metus vitae ipsum.',
		artist_name : 'Sarahi Frank',
		dimension   : '6x8',
		description : 'Integer pede justo',
		media       : 'Morbi non quam',
		img_url     :
			'https://res.cloudinary.com/hvs67cwpo/image/upload/v1599426688/works/gpbi3smpyhbl1q8dp8wj.jpg',
		public_id   : 'default',
		user_id     : 10
	},
	{
		title       : 'Morbi non quam nec dui luctus rutrum.',
		artist_name : 'Deja Pace',
		dimension   : '3x9',
		description : 'Donec diam neque, vestibulum ege',
		media       : 'Nunc purus.',
		img_url     :
			'https://res.cloudinary.com/hvs67cwpo/image/upload/v1599426674/works/kcncgzqvdbwuyboancyj.jpg',
		public_id   : 'default',
		user_id     : 8
	},
	{
		title       :
			'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue.',
		artist_name : 'Lane Myers',
		dimension   : '9x7',
		description : 'Nunc purus.',
		media       : 'Integer pede justo',
		img_url     :
			'https://res.cloudinary.com/hvs67cwpo/image/upload/v1599426648/works/sfiszu6hywcwgfqyoo1j.jpg',
		public_id   : 'default',
		user_id     : 1
	},
	{
		title       : 'Nunc purus.',
		artist_name : 'Clara Ayala',
		dimension   : '4x7',
		description : 'Integer pede justo',
		media       : 'Nunc purus.',
		img_url     :
			'https://res.cloudinary.com/hvs67cwpo/image/upload/v1599426633/works/f6eqest9i3nng8texnht.jpg',
		public_id   : 'default',
		user_id     : 4
	},
	{
		title       : 'Pellentesque eget nunc.',
		artist_name : 'Joaquin Buckley',
		dimension   : '3x8',
		description : 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
		media       : 'Integer pede justo',
		img_url     :
			'https://res.cloudinary.com/hvs67cwpo/image/upload/v1599426621/works/axgz3q2sbwipizhcaffh.jpg',
		public_id   : 'default',
		user_id     : 7
	},
	{
		title       : 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
		artist_name : 'Jovani Winters',
		dimension   : '9x7',
		description : 'Integer pede justo',
		media       : 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
		img_url     :
			'https://res.cloudinary.com/hvs67cwpo/image/upload/v1599426604/works/mbcgxzyvlfbrggm9ajp8.jpg',
		public_id   : 'default',
		user_id     : 4
	},
	{
		title       : 'In hac habitasse platea dictumst.',
		artist_name : 'Chase Ashley',
		dimension   : '8x9',
		description : 'Integer pede justo',
		media       : 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
		img_url     :
			'https://res.cloudinary.com/hvs67cwpo/image/upload/v1599426588/works/bqm8bdcztxb2jwljeqky.jpg',
		public_id   : 'default',
		user_id     : 1
	},
	{
		title       : 'Morbi non quam nec dui luctus rutrum.',
		artist_name : 'Kathy Conner',
		dimension   : '6x4',
		description : 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
		media       : 'Integer pede justo',
		img_url     :
			'https://res.cloudinary.com/hvs67cwpo/image/upload/v1599426567/works/khrieueg8vxpmgbhdznr.jpg',
		public_id   : 'default',
		user_id     : 1
	},
	{
		title       : 'Duis ac nibh.',
		artist_name : 'Tatum Ball',
		dimension   : '7x3',
		description : 'Integer pede justo',
		media       : 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
		img_url     :
			'https://res.cloudinary.com/hvs67cwpo/image/upload/v1599426538/works/zpflj9wfh4qjqeq8a3el.jpg',
		public_id   : 'default',
		user_id     : 9
	},
	{
		title       : 'Curabitur at ipsum ac tellus semper interdum.',
		artist_name : 'Aylin Wagner',
		dimension   : '4x8',
		description : 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
		media       : 'Integer pede justo',
		img_url     : 'https://source.unsplash.com/1080x960/?art',
		public_id   : 'default',
		user_id     : 5
	},
	{
		title       : 'In hac habitasse platea dictumst.',
		artist_name : 'Ernesto West',
		dimension   : '3x9',
		description : 'Morbi non quam nec',
		media       : 'Integer pede justo',
		img_url     : 'https://source.unsplash.com/1080x960/?art',
		public_id   : 'default',
		user_id     : 3
	},
	{
		title       : 'Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo.',
		artist_name : 'Callum Wu',
		dimension   : '2x8',
		description : 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
		media       : 'Integer pede justo',
		img_url     : 'https://source.unsplash.com/1080x960/?art',
		public_id   : 'default',
		user_id     : 10
	},
	{
		title       : 'Donec dapibus.',
		artist_name : 'Zachary Potts',
		dimension   : '8x7',
		description : 'Integer pede justo',
		media       : 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
		img_url     : 'https://source.unsplash.com/1080x960/?art',
		public_id   : 'default',
		user_id     : 8
	},
	{
		title       : 'Nulla tellus.',
		artist_name : 'Anne Reyes',
		dimension   : '6x7',
		description : 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
		media       : 'Integer pede justo',
		img_url     : 'https://source.unsplash.com/1080x960/?art',
		public_id   : 'default',
		user_id     : 3
	},
	{
		title       :
			'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo.',
		artist_name : 'Aleena Carrillo',
		dimension   : '5x9',
		description : 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
		media       : 'Integer pede justo',
		img_url     : 'https://source.unsplash.com/1080x960/?art',
		public_id   : 'default',
		user_id     : 3
	},
	{
		title       :
			'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam.',
		artist_name : 'Holly Benson',
		dimension   : '9x6',
		description : 'Integer pede justo',
		media       : 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
		img_url     : 'https://source.unsplash.com/1080x960/?art',
		public_id   : 'default',
		user_id     : 7
	},
	{
		title       : 'In hac habitasse platea dictumst.',
		artist_name : 'Emmett Roman',
		dimension   : '6x8',
		description : 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
		media       : 'Integer pede justo',
		img_url     : 'https://source.unsplash.com/1080x960/?art',
		public_id   : 'default',
		user_id     : 6
	},
	{
		title       : 'Etiam justo.',
		artist_name : 'Jordyn Beck',
		dimension   : '5x9',
		description : 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
		media       : 'Integer pede justo',
		img_url     : 'https://source.unsplash.com/1080x960/?art',
		public_id   : 'default',
		user_id     : 4
	},
	{
		title       : 'Nulla ut erat id mauris vulputate elementum.',
		artist_name : 'Adelaide Mcdowell',
		dimension   : '5x8',
		description : 'Integer pede justo',
		media       : 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
		img_url     : 'https://source.unsplash.com/1080x960/?art',
		public_id   : 'default',
		user_id     : 6
	},
	{
		title       :
			'Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.',
		artist_name : 'Keely Chandler',
		dimension   : '4x8',
		description : 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
		media       : 'Nulla ut erat',
		img_url     : 'https://source.unsplash.com/1080x960/?art',
		public_id   : 'default',
		user_id     : 7
	}
];

const seedPosts = () => Post.bulkCreate(postdata);

module.exports = seedPosts;
