import React, { useState } from "react";

const EditModal = ({
  onChangeNick,
  onChangeUser,
  profileImg,
  banner,
  newInfo,
  onCloseModal,
}) => {
  const onEditImg = () => {};

  //첨부파일 뱃지 추가
  //  inputs.addEventListener("change", () => {
  //   const file = inputs.value.split("\\"); //경로
  //   const baseUrl = '../images/'
  //   //preview
  //   const [image] = inputs.files
  //   if (image) {
  //     const preView = document.querySelector('#addPost .thumbnail-area');
  //     preView.style = `background-image: url(${URL.createObjectURL(image)})`
  //   }

  //   if (!file[0].length) return;
  //   $(".file-badge").length > 0 && $(".file-badge").remove(); // 사진 첨부되었는데 또 했을 경우 새로 추가한 사진만 남기기

  //   const fileBadge_element =
  //     '<span class="file-badge ellipse"><a href="#">' +
  //     file[file.length - 1] +
  //     "</a></span >";
  //   $(".js-form-file").append(fileBadge_element);
  //   $(".empty-input").removeClass("empty-input");
  //   //formData에 저장된 이미지 경로는 백엔드에서만 확인 가능
  //   const formData = new FormData();
  //   formData.set("file_", file);
  // });

  return (
    <>
      <div className="modal modal-edit">
        <header className="float-clear" style={{ width: "85%" }}>
          <h3 className="float-left title title__medium">프로필 수정</h3>
          <button
            type="button"
            className="btn-close float-right"
            onClick={onCloseModal}
          >
            닫기
          </button>
        </header>
        <span className="divider" style={{ width: "85%" }}></span>

        <section className="modal-body">
          <div className="input-util input__edit-nick">
            <span className="title title__small">닉네임</span>
            <input
              id="editNick"
              name="usernick"
              type="text"
              value={newInfo}
              onChange={onChangeNick}
            />
          </div>

          <div className="input-util input__e dit-img">
            <span className="title title__small">프로필 사진</span>
            <div className="input__bind-label">
              <label htmlFor="editProfileImg">수정</label>
              <input type="file" name="" id="editProfileImg" />
            </div>
          </div>

          <div className="modal-edit__img">
            <img src={profileImg} alt="" />
          </div>

          <div className="input-util input__edit-banner">
            <label className="title title__small">배너 사진</label>
            <div className="input__bind-label">
              <label htmlFor="editBanner">수정</label>
              <input id="editBanner" type="file" />
            </div>
          </div>
          <div>
            <img src={banner} alt="" />
          </div>
        </section>

        <footer>
          <button
            className="btn btn__primary btn__large "
            style={{ width: "100%" }}
            onClick={onChangeUser}
          >
            완료
          </button>
          <p className="float-clear">
            <a href="#페이지경로" className="float-right ">
              회원정보 변경하기
            </a>
            <a href="#페이지경로" className="float-right partition">
              비밀번호 변경하기
            </a>
          </p>
        </footer>
      </div>
    </>
  );
};

export default EditModal;
