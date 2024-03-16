import React from 'react';
import './App.css';
import PostList from './PostList';

const posts = [
  {
    id: 1,
    title: 'Post 1',
    body: 'Lorem ipsum dolor sit amet.',
    comments: ['Comment 1', 'Comment 2'],
  },
  {
    id: 2,
    title: 'Post 2',
    body: 'Consectetur adipiscing elit.',
    comments: ['Comment 3'],
  },
];

function App() {
  return (
    <div className="App">
      <h1>Post Comment Like App</h1>
      <PostList posts={posts} />
    </div>
  );
}

export default App;
