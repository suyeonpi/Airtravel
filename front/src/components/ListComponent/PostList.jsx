import React, { useState } from "react";
import PostCard from "../PostComponent/PostCard";
import PostMenu from "../ModalComponent/PostMenu";
import { useNavigate, Link } from "react-router-dom";

const PostList = ({ posts, mypage, onAddPostHandler, text }) => {
  const navigate = useNavigate();

  const onDetilView = (postId) => {
    navigate(`/detailview/${postId}`);
  };

  return (
    <>
      <div className="float-clear" style={{ margin: "2.5rem 0" }}>
        <span className="float-left" style={{ fontSize: "1.8rem" }}>
          총 <span style={{ color: "#3269f6" }}>{posts.length}</span> 건
        </span>
        {mypage && (
          <button
            className="float-right btn btn__primary btn__small btn__regist-post"
            onClick={onAddPostHandler}
          >
            등록하기
          </button>
        )}
      </div>
      <div className="post__wrap float-clear ">
        {posts.length > 0 ? (
          posts.map((post, idx) => (
            <PostCard
              onDetilView={onDetilView}
              post={post}
              idx={idx}
              key={idx + Math.random().toString()}
            />
          ))
        ) : (
          //선택한 필터의 게시물이 없을 경우에 나타낼 문구
          <div className="post__noresult">
            <p>아직 {text} 게시물이 없네요!</p>
          </div>
        )}
      </div>
      {/* <PostMenu /> */}
    </>
  );
};

export default PostList;
