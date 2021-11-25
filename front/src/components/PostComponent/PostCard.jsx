import React, { useState } from "react";

const PostCard = ({ post, idx, postImage, onDetilView }) => {
  const [like, setLike] = useState(false);
  const onToggleHandler = () => setLike((prev) => !prev);
  return (
    <>
      <div className="post" onClick={() => onDetilView(post.id)}>
        <a href="">
          <div className="post__thumb-nail">
            <img src={post.picture_url} alt="" />
          </div>
        </a>
      </div>
    </>
  );
};

export default PostCard;
