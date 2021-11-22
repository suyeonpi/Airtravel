import React, { useState, useEffect } from "react";

import PostList from "../components/ListComponent/PostList";
import EditModal from "../components/ModalComponent/EditModal";

import { updateMe, getMyInfo } from "../apis/users";

const MyPage = ({ posts }) => {
  const fd = new FormData();

  const [oldNick, setOldNick] = useState(localStorage.usernick);
  const [newInfo, setNewInfo] = useState(localStorage.usernick);

  const [dbuser_url, setDbUser_url] = useState(); //업로드 용
  const [dbBack_url, seDbBack_url] = useState(); //업로드 용

  const [activeEditModal, setActiveEditModal] = useState(false);
  const [profileImg, setprofileImg] = useState(); //preview 용
  const [banner, setBanner] = useState(); //preview 용

  const onSaveUserInfo = () => {
    setNewInfo(oldNick);
    newInfo !== oldNick && fd.append("usernick", oldNick);
    fd.append("back_url", dbBack_url, dbBack_url.name);
    fd.append("user_url", dbuser_url, dbuser_url.name);
    onEditProfile();
    onSubmit();
  };

  const onSubmit = () => {
    updateMe(fd).then((res) => {
      console.log("onSubmitonSubmitonSubmitonSubmit", res);
      getMyInfo().then((res) => {
        console.log("Mypage getMyInfo 가져옴", res);
      });
    });
  };

  useEffect(() => {
    getMyInfo().then((res) => {
      console.log("Mypage getMyInfo 가져옴", res);
      localStorage.usernick = res.usernick;
    });
    return () => {};
  }, []);

  const changeOldNick = (e) => {
    setOldNick(e.target.value);
  };

  //수정모달 활성 비활성
  const onEditProfile = () => setActiveEditModal((prev) => !prev);

  const [selectedFile, setSelectedFile] = useState();

  const onChangeImg = (val, file) => {
    if (file[0].type.substr(0, 5) !== "image") return;
    const image = file[0];
    if (image) setprofileImg(URL.createObjectURL(image));
    setDbUser_url(image);
  };

  const onChangeBanner = (val, file) => {
    if (file[0].type.substr(0, 5) !== "image") return;
    const image = file[0];
    if (image) setBanner(URL.createObjectURL(image));
    seDbBack_url(image);
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
