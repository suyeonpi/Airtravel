import React, { useState, useEffect } from "react";

import PostList from "../components/ListComponent/PostList";
import EditModal from "../components/ModalComponent/EditModal";

// dummy data import
import userDummy from "../assets/js/userDummy";
import DummyPost from "../assets/js/DummyPost";
//이미지import
import profileBg from "../assets/images/@img-profile-bg.jpg";
import profileImg from "../assets/images/@img-user-profile.png";

const MyPage = () => {
  const [userInfo, setUserInfo] = useState({ ...userDummy });
  const [posts, setPosts] = useState([...DummyPost]);
  const [activeEditModal, setActiveEditModal] = useState(true);
  const [activeAddModal, setactiveAddModal] = useState(false);

  const onAddPostHandler = () => {
    alert("포스트 등록");
  };

  const onChangeUser = (newData) => {
    const [name, value] = newData;
    console.log(name, value);
  };

  const onEditProfile = () => setActiveEditModal((prev) => !prev);

  return (
    <>
      <div className="profile">
        {/* S: 프로필 Banner */}
        <div className="profile__bg">
          <img src={profileBg} alt="" />
        </div>
        {/* E: 프로필 Banner */}

        <div className="profile__info">
          <div className="profile__img">
            <a href="#profile">
              <img src={profileImg} alt="" />
            </a>
          </div>
          {/* 유저 닉네임 */}
          <p className="profile__nick">{userInfo.usernick}</p>
          <button
            type="button"
            onClick={onEditProfile}
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
        <PostList
          posts={posts}
          mypage={true}
          onAddPostHandler={onAddPostHandler}
        />
      </div>
      {/* 프로필 수정 모달 */}
      {activeEditModal && (
        <EditModal userInfo={userInfo} onChangeUser={onChangeUser} />
      )}
    </>
  );
};

export default MyPage;
