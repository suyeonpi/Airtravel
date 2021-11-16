import React, { useState } from "react";
import PostCard from "../PostComponent/PostCard";

const PostList = ({ posts }) => {
  return (
    <>
      <p style={{ fontSize: "1.8rem", margin: "2rem  0" }}>
        총 <span style={{ color: "#3269f6" }}>{posts.length}</span> 건
      </p>
      <div className="post__wrap clear-fix ">
        {posts.length > 0 ? (
          posts.map((post, idx) => (
            <PostCard post={post} key={idx + Math.random().toString()} />
          ))
        ) : (
          <div className="post__noresult ">
            <p>아직 게시물이 없네요!</p>
          </div>
        )}
      </div>
    </>
  );
};

export default PostList;
