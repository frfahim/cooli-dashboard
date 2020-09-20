const posts =  [
  {
    title: 'A sample post with image',
    desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry scrambled it to make text of the printing and typesetting industry scrambled a type specimen book text of the dummy text of the printing printing and typesetting industry scrambled dummy text of the printing.',
    featuredImage: require('@/static/avatar/man_1.jpg'),
    author: 'Jessie Wang',
    createdAt: new Date().toLocaleDateString()
  },
  {
    title: 'A sample post with image',
    desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry scrambled it to make text of the printing and typesetting industry scrambled a type specimen book text of the dummy text of the printing printing and typesetting industry scrambled dummy text of the printing.',
    featuredImage: require('@/static/avatar/man_1.jpg'),
    author: 'Li Love',
    createdAt: new Date().toLocaleDateString()
  },
  {
    title: 'A sample post with image',
    desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry scrambled it to make text of the printing and typesetting industry scrambled a type specimen book text of the dummy text of the printing printing and typesetting industry scrambled dummy text of the printing.',
    featuredImage: require('@/static/avatar/man_1.jpg'),
    author: 'Jim Wang',
    createdAt: new Date().toLocaleDateString()
  },
  {
    title: 'A sample post with image',
    desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry scrambled it to make text of the printing and typesetting industry scrambled a type specimen book text of the dummy text of the printing printing and typesetting industry scrambled dummy text of the printing.',
    featuredImage: require('@/static/avatar/man_1.jpg'),
    author: 'John Doe',
    createdAt: new Date().toLocaleDateString()
  },
];

const getPost = (limit) => {
  return (limit) ? posts.slice(0, limit) : posts;
};

export {
  getPost
};
