import React, { useState, useEffect } from "react";
import PostList from "../components/ListComponent/PostList";
import EditModal from "../components/ModalComponent/EditModal";

import { updateMe, getMyInfo } from "../apis/users";

const MyPage = ({ posts, likedPosts }) => {
  const fd = new FormData();

  const [oldNick, setOldNick] = useState(localStorage.usernick);
  const [newNick, setNewNick] = useState(localStorage.usernick);

  const [dbuser_url, setDbUser_url] = useState(); //업로드 용
  const [dbBack_url, seDbBack_url] = useState(); //업로드 용

  const [profileImg, setprofileImg] = useState(); //preview 용
  const [banner, setBanner] = useState(); //preview 용

  const [all, setAll] = useState(true);

  //수정모달 활성 비활성
  const [activeEditModal, setActiveEditModal] = useState(false);

  const onEditProfile = () => setActiveEditModal((prev) => !prev);

  const changeOldNick = (e) => setOldNick(e.target.value);

  //페이지 랜더링 후, 내 정보 가져오는 API 호출
  useEffect(() => {
    getMyInfo().then((res) => {
      setBanner(res.back_url);
      setprofileImg(res.user_url);
      if (res.usernick !== localStorage.usernick) {
        localStorage.usernick = res.usernick;
      }
    });
  }, []);

  //업데이트 API 호출
  const onSubmit = () => {
    updateMe(fd).then((res) => {
      console.log(res);
    });
  };

  useEffect(() => {
    if (newNick !== oldNick) {
      localStorage.usernick = oldNick;
    }
  }, [newNick, oldNick]);

  // 프로필 수정 창 완료 누를 때 실행
  const onSaveUserInfo = async () => {
    setNewNick(oldNick);
    onEditProfile();
    await (function() {
      fd.append("usernick", oldNick);
      dbBack_url && fd.append("back_url", dbBack_url, dbBack_url.name);
      dbuser_url && fd.append("user_url", dbuser_url, dbuser_url.name);
    })();
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

  const onSwitchTabHandler = (boolean) => {
    setAll(boolean);
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
        {/* Tab */}
        <div className="btn-wrap">
          <button
            type="button"
            className={
              all ? "btn btn__small btn__black-outline" : "btn btn__small"
            }
            onClick={() => onSwitchTabHandler(true)}
          >
            전체
          </button>
          <button
            type="button"
            className={
              !all ? "btn btn__small btn__black-outline" : "btn btn__small"
            }
            onClick={() => onSwitchTabHandler(false)}
          >
            좋아요
          </button>
        </div>
        {all ? (
          <PostList posts={posts} mypage={true} text={"작성한"} />
        ) : (
          <PostList posts={likedPosts} mypage={true} text={"좋아한"} />
        )}
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
