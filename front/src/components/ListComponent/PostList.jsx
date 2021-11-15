import React, { useState } from "react";
import PostCard from "../PostComponent/PostCard";
import DummyPost from "../../assets/js/DummyPost";

const PostList = () => {
  const [posts, setPosts] = useState(DummyPost);

  return (
    <>
      <div className="post__wrap clear-fix ">
        {posts.map((post, idx) => {
          return (
            <PostCard post={post} key={idx + "__" + Math.random().toString()} />
          );
        })}
      </div>
    </>
  );
};

export default PostList;
