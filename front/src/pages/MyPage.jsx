import React, { useState, useEffect } from "react";

import PostList from "../components/ListComponent/PostList";
import EditModal from "../components/ModalComponent/EditModal";

// dummy data import
import userDummy from "../assets/js/userDummy";
import DummyPost from "../assets/js/DummyPost";
//이미지import
import profileBg from "../assets/images/@img-profile-bg.jpg";
import profile_Img from "../assets/images/@img-user-profile.png";

const MyPage = () => {
  const [userInfo, setUserInfo] = useState({ ...userDummy });
  const [newInfo, setNewInfo] = useState(userInfo.usernick);

  const [posts, setPosts] = useState([...DummyPost]);
  const [activeEditModal, setActiveEditModal] = useState(false);
  const [activeAddModal, setactiveAddModal] = useState(false);
  const [profileImg, setprofileImg] = useState(profile_Img);
  const [banner, setBanner] = useState(profileBg);

  const onApiHandler = () => onEditProfile();

  const onAddPostHandler = () => {
    alert("포스트 등록");
  };

  const onChangeUser = () => {
    setUserInfo({
      ...userInfo,
      ["usernick"]: newInfo,
    });
    onApiHandler();
  };

  const onChangeNick = (e) => {
    const { name, value } = e.target;
    setNewInfo((prev) => (prev = value));
  };

  const onEditProfile = () => setActiveEditModal((prev) => !prev);

  const onChangeImg = (e) => {
    const fileName = e.target.value.split("\\").pop(); //이미지 이름
    const [image] = e.target.files;
    if (image) setprofileImg(URL.createObjectURL(image));
  };
  const onChangeBanner = (e) => {
    const fileName = e.target.value.split("\\").pop(); //이미지 이름
    const [image] = e.target.files;
    if (image) setBanner(URL.createObjectURL(image));
  };
  return (
    <>
      <div className="profile">
        {/* S: 프로필 Banner */}
        <div className="profile__bg">
          <img src={banner} alt="" />
        </div>
        {/* E: 프로필 Banner */}

        <div className="profile__info">
          <div className="profile__img">
            <span>
              <img src={profileImg} alt="" />
            </span>
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
      <div className="content-wrap">
        <PostList
          posts={posts}
          mypage={true}
          onAddPostHandler={onAddPostHandler}
        />
      </div>

      {/* 프로필 수정 모달 */}
      {activeEditModal && (
        <div className="modal-back">
          <EditModal
            newInfo={newInfo}
            onChangeUser={onChangeUser}
            profileImg={profileImg}
            banner={banner}
            onChangeNick={onChangeNick}
            onCloseModal={onEditProfile}
            onChangeImg={onChangeImg}
            onChangeBanner={onChangeBanner}
          />
        </div>
      )}
    </>
  );
};

export default React.memo(MyPage);
