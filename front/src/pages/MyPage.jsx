import React, { useState, useEffect } from "react";
import PostList from "../components/ListComponent/PostList";
import EditModal from "../components/ModalComponent/EditModal";

import { updateMe, getMyInfo } from "../apis/users";
import { getMyCards } from "../apis/cards";

const MyPage = ({ posts }) => {
  const fd = new FormData();

  const [oldNick, setOldNick] = useState(localStorage.usernick);
  const [newNick, setNewNick] = useState(localStorage.usernick);

  const [dbuser_url, setDbUser_url] = useState(); //업로드 용
  const [dbBack_url, seDbBack_url] = useState(); //업로드 용

  const [profileImg, setprofileImg] = useState(); //preview 용
  const [banner, setBanner] = useState(); //preview 용

  //수정모달 활성 비활성
  const [activeEditModal, setActiveEditModal] = useState(false);

  const onEditProfile = () => setActiveEditModal((prev) => !prev);

  //내 정보 가져오기 API
  useEffect(() => {
    getMyInfo()
      .then((res) => {
        setBanner(res.back_url);
        setprofileImg(res.user_url);
        if (res.usernick !== localStorage.usernick) {
          localStorage.usernick = res.usernick;
        }
      })
      .then(() => {
        getMyCards(localStorage.usernick).then((res) => {
          console.log("get My Cards", res);
        });
      });
  }, []);

  const changeOldNick = (e) => setOldNick(e.target.value);

  //업데이트 API 호출
  const onSubmit = () => updateMe(fd).then((res) => console.log(res));

  useEffect(() => {
    if (newNick !== oldNick) {
      fd.append("usernick", oldNick);
      localStorage.usernick = oldNick;
    }
  }, [fd, newNick, oldNick]);

  // 프로필 수정 창 완료 누를 때 실행
  const onSaveUserInfo = () => {
    setNewNick(oldNick);
    onEditProfile();
    dbBack_url && fd.append("back_url", dbBack_url, dbBack_url.name);
    dbuser_url && fd.append("user_url", dbuser_url, dbuser_url.name);
    onSubmit();
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

  const onChangeImg = (val, file) => {
    if (file[0].type.substr(0, 5) !== "image") return;
    const image = file[0];
    if (image) setprofileImg(URL.createObjectURL(image)); //이미지 preview
    setDbUser_url(image);
  };

  const onChangeBanner = (val, file) => {
    if (file[0].type.substr(0, 5) !== "image") return;
    const image = file[0];
    if (image) setBanner(URL.createObjectURL(image)); //이미지 preview
    seDbBack_url(image);
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
          <p className="profile__nick">{newNick}</p>
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
