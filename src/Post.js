import React, { useState } from 'react';
import CommentForm from './CommentForm';
import LikeButton from './LikeButton';

const Post = ({ post }) => {
  const [comments, setComments] = useState(post.comments || []);

  const addComment = comment => {
    const newComments = [...comments, comment];
    setComments(newComments);
  };

  return (
    <div>
      <h3>{post.title}</h3>
      <p>{post.body}</p>
      <LikeButton />
      <h4>Comments:</h4>
      <ul>
        {comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
      <CommentForm addComment={addComment} />
    </div>
  );
};

export default Post;
