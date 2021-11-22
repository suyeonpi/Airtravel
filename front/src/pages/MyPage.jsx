import React, { useState, useEffect } from "react";

import PostList from "../components/ListComponent/PostList";
import EditModal from "../components/ModalComponent/EditModal";

import { updateMe } from "../apis/users";
import { getCards } from "../apis/cards";

// dummy data import
import DummyPost from "../assets/js/DummyPost";
//이미지import
import profileBg from "../assets/images/@img-profile-bg.jpg";
import profile_Img from "../assets/images/@img-user-profile.png";

const MyPage = ({ loginInfo }) => {
  const [userInfo, setUserInfo] = useState("");
  const [newInfo, setNewInfo] = useState();

  const [posts, setPosts] = useState();
  const [activeEditModal, setActiveEditModal] = useState(false);
  const [activeAddModal, setactiveAddModal] = useState(false);
  const [profileImg, setprofileImg] = useState(profile_Img);
  const [banner, setBanner] = useState(profileBg);

  const onApiHandler = () => onEditProfile();

  const onChangeUser = () => {
    updateMe().then((res) => {});
    onApiHandler();
  };

  const onChangeNick = (e) => {
    const { name, value } = e.target;
    setNewInfo((prev) => (prev = value));
  };

  useEffect(() => {
    setUserInfo((prev) => (prev = loginInfo));
    getCards(loginInfo).then((res) => {
      console.log("안녕하세여!", res);
      setPosts(res);
    });
  }, [loginInfo]);

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
          <p className="profile__nick">{loginInfo}</p>
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
        {/* <PostList posts={posts} mypage={true} /> */}
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
