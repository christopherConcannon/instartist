const { Post } = require('../models');

const postdata = [
  {
    title: 'Donec posuere metus vitae ipsum.',
    artist_name: '',
    dimension: '',
    description: '',
    media: '',
    img_url: '',
    user_id: 10
  },
  {
    title: 'Morbi non quam nec dui luctus rutrum.',
    artist_name: '',
    dimension: '',
    description: '',
    media: '',
    img_url: '',
    user_id: 8
  },
  {
    title: 'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue.',
    artist_name: '',
    dimension: '',
    description: '',
    media: '',
    img_url: '',
    user_id: 1
  },
  {
    title: 'Nunc purus.',
    artist_name: '',
    dimension: '',
    description: '',
    media: '',
    img_url: '',
    user_id: 4
  },
  {
    title: 'Pellentesque eget nunc.',
    artist_name: '',
    dimension: '',
    description: '',
    media: '',
    img_url: '',
    user_id: 7
  },
  {
    title: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
    artist_name: '',
    dimension: '',
    description: '',
    media: '',
    img_url: '',
    user_id: 4
  },
  {
    title: 'In hac habitasse platea dictumst.',
    artist_name: '',
    dimension: '',
    description: '',
    media: '',
    img_url: '',
    user_id: 1
  },
  {
    title: 'Morbi non quam nec dui luctus rutrum.',
    artist_name: '',
    dimension: '',
    description: '',
    media: '',
    img_url: '',
    user_id: 1
  },
  {
    title: 'Duis ac nibh.',
    artist_name: '',
    dimension: '',
    description: '',
    media: '',
    img_url: '',
    user_id: 9
  },
  {
    title: 'Curabitur at ipsum ac tellus semper interdum.',
    artist_name: '',
    dimension: '',
    description: '',
    media: '',
    img_url: '',
    user_id: 5
  },
  {
    title: 'In hac habitasse platea dictumst.',
    artist_name: '',
    dimension: '',
    description: '',
    media: '',
    img_url: '',
    user_id: 3
  },
  {
    title: 'Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo.',
    artist_name: '',
    dimension: '',
    description: '',
    media: '',
    img_url: '',
    user_id: 10
  },
  {
    title: 'Donec dapibus.',
    artist_name: '',
    dimension: '',
    description: '',
    media: '',
    img_url: '',
    user_id: 8
  },
  {
    title: 'Nulla tellus.',
    artist_name: '',
    dimension: '',
    description: '',
    media: '',
    img_url: '',
    user_id: 3
  },
  {
    title: 'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo.',
    artist_name: '',
    dimension: '',
    description: '',
    media: '',
    img_url: '',
    user_id: 3
  },
  {
    title:
      'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam.',
      artist_name: '',
      dimension: '',
      description: '',
      media: '',
      img_url: '',
    user_id: 7
  },
  {
    title: 'In hac habitasse platea dictumst.',
    artist_name: '',
    dimension: '',
    description: '',
    media: '',
    img_url: '',
    user_id: 6
  },
  {
    title: 'Etiam justo.',
    artist_name: '',
    dimension: '',
    description: '',
    media: '',
    img_url: '',
    user_id: 4
  },
  {
    title: 'Nulla ut erat id mauris vulputate elementum.',
    artist_name: '',
    dimension: '',
    description: '',
    media: '',
    img_url: '',
    user_id: 6
  },
  {
    title: 'Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.',
    artist_name: '',
    dimension: '',
    description: '',
    media: '',
    img_url: '',
    user_id: 7
  }
];

const seedPosts = () => Post.bulkCreate(postdata);

module.exports = seedPosts;
