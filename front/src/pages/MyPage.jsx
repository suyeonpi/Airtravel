import React, { useState, useEffect } from "react";

import PostList from "../components/ListComponent/PostList";
import EditModal from "../components/ModalComponent/EditModal";

import { updateMe, getMyInfo } from "../apis/users";

const MyPage = ({ posts }) => {
  const fd = new FormData();
  const [oldNick, setOldNick] = useState(localStorage.usernick);
  const [newInfo, setNewInfo] = useState(localStorage.usernick);

  const [activeEditModal, setActiveEditModal] = useState(false);
  const [profileImg, setprofileImg] = useState(); //preview 용
  const [banner, setBanner] = useState(); //preview 용

  const onSaveUserInfo = () => {
    setNewInfo(oldNick);
    fd.append("usernick", oldNick);
    onEditProfile();
    onSubmit();
  };

  const onSubmit = () => {
    updateMe(fd).then((res) => {
      if (res.user.usernick === oldNick) {
        localStorage.usernick = oldNick;
      }
    });
  };

  useEffect(() => {
    getMyInfo().then((res) => {
      console.log("가져옴1", res);
    });
    return () => {};
  }, []);

  const changeOldNick = (e) => {
    setOldNick(e.target.value);
  };

  //수정모달 활성 비활성
  const onEditProfile = () => setActiveEditModal((prev) => !prev);

  const onChangeImg = (val, file) => {
    const [image] = file;
    if (image) setprofileImg(URL.createObjectURL(image));
    fd.append("user_url", image);
  };

  const onChangeBanner = (val, file) => {
    const [image] = file;
    if (image) setBanner(URL.createObjectURL(image));
    fd.append("back_url", image);
  };

  const onImageHandler = (e) => {
    switch (e.target.name) {
      case "backImg":
        return onChangeBanner(e.target.value, e.target.files);
      case "profileImg":
        return onChangeImg(e.target.value, e.target.files);
      default:
        return "none";
    }
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
            onImageHandler={onImageHandler}
          />
        </div>
      )}
    </>
  );
};

export default React.memo(MyPage);
