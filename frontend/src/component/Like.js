import React, { useState } from 'react';
import { FaThumbsUp,FaRegThumbsUp } from 'react-icons/fa';
import Button from 'react-bootstrap/Button';

const Like = ({ content, imageUrl, initialLikes }) => {
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(false);

  const handleClick = () => {
    setLiked(!liked);
  };

  const handleLike = () => {
    setLikes(likes + 1);
  };

  return (
    <div style={styles.postContainer}>
      <img src={imageUrl} alt="Post" style={styles.postImage} />
      <p style={styles.postContent}>{content}</p>
      {/* <button style={styles.likeButton} onClick={handleLike}>
        Like
      </button> */}
      {/* <Button variant="primary" onClick={handleClick}>
      {liked ? <FaThumbsUp /> : <FaRegThumbsUp />} {liked ? 'Liked' : 'Like'}
    </Button> */}
    </div>
  );
};

const styles = {
  postContainer: {
    border: '1px solid #ddd',
    padding: '16px',
    borderRadius: '8px',
    maxWidth: '400px',
    margin: '16px auto',
    backgroundColor: '#f9f9f9',
  },
  postImage: {
    width: '100%',
    height: 'auto',
    borderRadius: '8px',
    marginBottom: '12px',
  },
  postContent: {
    fontSize: '18px',
    marginBottom: '12px',
  },
  likeButton: {
    padding: '8px 12px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  likeButtonHover: {
    backgroundColor: '#0056b3',
  },
  likeCount: {
    marginLeft: '12px',
    fontSize: '16px',
    verticalAlign: 'middle',
  },
};

export default Like;
