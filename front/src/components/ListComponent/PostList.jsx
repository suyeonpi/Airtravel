import React, { useState } from "react";
import PostCard from "../PostComponent/PostCard";

const PostList = ({ posts, mypage, onAddPostHandler }) => {
  return (
    <>
      <div className="set-flex" style={{ margin: "2.5rem 0" }}>
        <span style={{ fontSize: "1.8rem" }}>
          총 <span style={{ color: "#3269f6" }}>{posts.length}</span> 건
        </span>
        {mypage && (
          <button
            className="btn btn__primary btn__small btn__regist-post"
            onClick={onAddPostHandler}
          >
            등록하기
          </button>
        )}
      </div>
      <div className="post__wrap clear-fix ">
        {posts.length > 0 ? (
          posts.map((post, idx) => (
            <PostCard post={post} key={idx + Math.random().toString()} />
          ))
        ) : (
          //선택한 필터의 게시물이 없을 경우에 나타낼 문구
          <div className="post__noresult ">
            <p>아직 게시물이 없네요!</p>
          </div>
        )}
      </div>
    </>
  );
};

export default PostList;
