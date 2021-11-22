import React, { useState, useEffect } from "react";

import PostList from "../components/ListComponent/PostList";
import EditModal from "../components/ModalComponent/EditModal";

import { updateMe } from "../apis/users";

//이미지import
import profileBg from "../assets/images/@img-profile-bg.jpg";
import profile_Img from "../assets/images/@img-user-profile.png";

const MyPage = ({ posts }) => {
  const [oldNick, setOldNick] = useState(localStorage.usernick);
  const [newInfo, setNewInfo] = useState(localStorage.usernick);

  const [activeEditModal, setActiveEditModal] = useState(false);
  const [profileImg, setprofileImg] = useState(profile_Img);
  const [banner, setBanner] = useState(profileBg);

  const onSaveUserInfo = () => {
    setNewInfo(oldNick);
    onEditProfile();
  };

  useEffect(() => {
    console.log("mypage updateMe 실행");

    updateMe(newInfo, "", "").then((res) => {
      console.log("mypage updateMe", res);
      // localStorage.usernick = res.
    });
    return () => {};
  }, [newInfo]);

  const changeOldNick = (e) => {
    setOldNick(e.target.value);
  };

  //수정모달 활성 비활성
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
          <p className="profile__nick">{newInfo}</p>
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
        {/* TODO: 게시글 등록 페이지 띄우는 핸들러 필요 */}
        <PostList posts={posts} mypage={true} />
      </div>

      {/* 프로필 수정 모달 */}
      {activeEditModal && (
        <div className="modal-back">
          <EditModal
            oldNick={oldNick}
            changeOldNick={changeOldNick}
            onSaveUserInfo={onSaveUserInfo}
            profileImg={profileImg}
            banner={banner}
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
