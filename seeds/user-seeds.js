const { User } = require('../models');

const userdata = [
  {
    username: 'alesmonde0',
    email: 'nwestnedge0@cbc.ca',
    password: 'password123',
    bio: 'Donec posuere metus vitae ipsum.',
    medium: 'Nunc purus.',
    interests: 'Morbi non quam nec dui luctus rutrum.',
    user_img_url: 'https://source.unsplash.com/300x300/?person'
  },
  {
    username: 'jwilloughway1',
    email: 'rmebes1@sogou.com',
    password: 'password123',
    bio: 'Nunc purus.',
    medium: 'Morbi non quam nec dui luctus rutrum.',
    interests: 'Donec posuere metus vitae ipsum.',
    user_img_url: 'https://source.unsplash.com/300x300/?person'
  },
  {
    username: 'iboddam2',
    email: 'cstoneman2@last.fm',
    password: 'password123',
    bio: 'Morbi non quam nec dui luctus rutrum.',
    medium: 'Donec posuere metus vitae ipsum.',
    interests: 'Nunc purus.',
    user_img_url: 'https://source.unsplash.com/300x300/?person'
  },
  {
    username: 'dstanmer3',
    email: 'ihellier3@goo.ne.jp',
    password: 'password123',
    bio: 'Nunc purus.',
    medium: 'Morbi non quam nec dui luctus rutrum.',
    interests: 'Donec posuere metus vitae ipsum.',
    user_img_url: 'https://source.unsplash.com/300x300/?person'
  },
  {
    username: 'djiri4',
    email: 'gmidgley4@weather.com',
    password: 'password123',
    bio: 'Donec posuere metus vitae ipsum.',
    medium: 'Nunc purus.',
    interests: 'Morbi non quam nec dui luctus rutrum.',
    user_img_url: 'https://source.unsplash.com/300x300/?person'
  },
  {
    username: 'msprague5',
    email: 'larnout5@imdb.com',
    password: 'password123',
    bio: 'Morbi non quam nec dui luctus rutrum.',
    medium: 'Donec posuere metus vitae ipsum.',
    interests: 'Nunc purus.',
    user_img_url: 'https://source.unsplash.com/300x300/?person'
  },
  {
    username: 'mpergens6',
    email: 'hnapleton6@feedburner.com',
    password: 'password123',
    bio: 'Nunc purus.',
    medium: 'Morbi non quam nec dui luctus rutrum.',
    interests: 'Donec posuere metus vitae ipsum.',
    user_img_url: 'https://source.unsplash.com/300x300/?person'
  },
  {
    username: 'tpenniell7',
    email: 'kperigo7@china.com.cn',
    password: 'password123',
    bio: 'Morbi non quam nec dui luctus rutrum.',
    medium: 'Donec posuere metus vitae ipsum.',
    interests: 'Nunc purus.',
    user_img_url: 'https://source.unsplash.com/300x300/?person'
  },
  {
    username: 'msabbins8',
    email: 'lmongain8@google.ru',
    password: 'password123',
    bio: 'Donec posuere metus vitae ipsum.',
    medium: 'Nunc purus.',
    interests: 'Morbi non quam nec dui luctus rutrum.',
    user_img_url: 'https://source.unsplash.com/300x300/?person'
  },
  {
    username: 'jmacarthur9',
    email: 'bsteen9@epa.gov',
    password: 'password123',
    bio: 'Nunc purus.',
    medium: 'Morbi non quam nec dui luctus rutrum.',
    interests: 'Donec posuere metus vitae ipsum.',
    user_img_url: 'https://source.unsplash.com/300x300/?person'
  }
];

const seedUsers = () => User.bulkCreate(userdata, { individualHooks: true, returning: true });

module.exports = seedUsers;
