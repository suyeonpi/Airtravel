import React, { useState, useEffect } from "react";

import PostList from "../components/ListComponent/PostList";
import userDummy from "../assets/js/userDummy";
import DummyPost from "../assets/js/DummyPost";

const MyPage = () => {
  const [userInfo, setUserInfo] = useState([...userDummy]);
  const [posts, setPosts] = useState([...DummyPost]);

  return (
    <>
      <div className="profile">
        <div className="profile__bg"></div>
        <div className="profile__info">
          <img src="" alt="" />
          <span>{userInfo[0].usernick}</span>
          <button type="button">프로필 편집</button>
        </div>
      </div>
      <div className="main-content-wrap">
        <PostList posts={posts} />
      </div>
    </>
  );
};

export default MyPage;
