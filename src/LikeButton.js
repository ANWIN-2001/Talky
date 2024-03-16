import React, { useState } from 'react';

const LikeButton = () => {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  const handleLike = () => {
    if (disliked) {
      setDisliked(false);
    }
    setLiked(!liked);
  };

  const handleDislike = () => {
    if (liked) {
      setLiked(false);
    }
    setDisliked(!disliked);
  };

  return (
    <div>
      <button onClick={handleLike}>{liked ? 'Reacted':'Like'  }</button>
      <button onClick={handleDislike}>{disliked ? 'Reacted' : 'Dislike'}</button>
    </div>
  );
};

export default LikeButton;
