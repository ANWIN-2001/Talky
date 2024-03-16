import React, { useState } from 'react';

const LikeButton = () => {
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
  };

  return (
    <div>
      <button onClick={handleLike}>{liked ? 'Unlike' : 'Like'}</button>
    </div>
  );
};

export default LikeButton;
