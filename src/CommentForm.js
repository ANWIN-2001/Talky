// CommentForm.js
import React, { useState } from 'react';
// import AddPost from './AddPost';

const CommentForm = ({ postId, addComment }) => {
  const [comment, setComment] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (!comment.trim()) return;
    addComment(postId, comment); // Include postId when submitting comment
    setComment('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={comment}
        onChange={e => setComment(e.target.value)}
        placeholder="Add a comment..."
      />
      <button type="submit">Add Comment</button>
    </form>

  );
};

export default CommentForm;
