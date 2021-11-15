import React, { useState } from "react";

const PostCard = ({ post }) => {
  const [like, setLike] = useState(false);
  const onToggleHandler = () => setLike((prev) => !prev);
  return (
    <>
      <div className="post">
        <div className="post__thumb-nail">
          <img src="" alt="" />
        </div>
        <div className="post__desc">
          <div className="post__main-info">
            <strong className="post__title">{post.title}</strong>
            <div className="btn__like">
              <input
                id="likeBtn"
                type="button"
                onClick={onToggleHandler}
                value={like}
                className={like ? "like" : ""}
              />
            </div>
          </div>
          <div className="post__sub-info">
            <span>{post.location}</span>
            <span>{post.continent}</span>
            <span>{post.date}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostCard;
