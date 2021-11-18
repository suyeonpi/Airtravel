import React, { useState } from "react";

const PostCard = ({ post, idx, postImage }) => {
  const [like, setLike] = useState(false);
  const onToggleHandler = () => setLike((prev) => !prev);
  return (
    <>
      <div className="post">
        <div className="post__thumb-nail">
          <img
            src={require("../../assets/images/@img-temp2.jpg").default}
            alt=""
          />
        </div>
      </div>
    </>
  );
};

export default PostCard;
