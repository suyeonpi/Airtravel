import React, { useState, useEffect } from "react";

import PostList from "../components/ListComponent/PostList";
import userDummy from "../assets/js/userDummy";
import DummyPost from "../assets/js/DummyPost";
import profileBg from "../assets/images/@img-profile-bg.jpg";
import profileImg from "../assets/images/@img-user-profile.png";

const MyPage = () => {
  const [userInfo, setUserInfo] = useState([...userDummy]);
  const [posts, setPosts] = useState([...DummyPost]);

  const onEditbackground = () => {};
  const onEditProfile = () => {};

  return (
    <>
      <div className="profile">
        <div className="profile__bg">
          <img src={profileBg} alt="" />
        </div>
        <div className="profile__info">
          <div className="profile__img">
            <a href="#profile">
              <img src={profileImg} alt="" />
            </a>
          </div>
          <p className="profile__nick">{userInfo[0].usernick}</p>
          <button
            type="button"
            className="btn btn__light"
            style={{
              fontSize: "1.8rem",
              fontWeight: "400",
              border: "2px solid #191919",
            }}
          >
            프로필 편집
          </button>
        </div>
      </div>
      <div className="main-content-wrap">
        <PostList posts={posts} mypage={true} />
      </div>
    </>
  );
};

export default MyPage;
