import React, { useState } from "react";

const PostCard = ({ post, idx, postImage }) => {
  const [like, setLike] = useState(false);
  const onToggleHandler = () => setLike((prev) => !prev);
  return (
    <>
      <div className="post">
        <div className="post__thumb-nail">
          <img src={require(`${"" + postImage}`)} alt="" />
        </div>
      </div>
    </>
  );
};

export default PostCard;
