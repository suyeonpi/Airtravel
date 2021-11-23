const EditModal = ({
  onSaveUserInfo,
  profileImg,
  banner,
  oldNick,
  changeOldNick,
  onCloseModal,
  onChangeImg,
  onChangeBanner,
  onImageHandler,
}) => {
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
              value={oldNick}
              onChange={changeOldNick}
            />
          </div>

          <div className="input-util input__e dit-img">
            <span className="title title__small">프로필 사진</span>
            <div className="input__bind-label">
              <label htmlFor="editProfileImg">수정</label>
              <input
                type="file"
                name="profileImg"
                id="editProfileImg"
                onChange={onImageHandler}
              />
            </div>
          </div>

          <div className="modal-edit__img">
            <img src={profileImg} alt="" />
          </div>

          <div className="input-util input__edit-banner">
            <label className="title title__small">배너 사진</label>
            <div className="input__bind-label">
              <label htmlFor="editBanner">수정</label>
              <input
                id="editBanner"
                type="file"
                name="backImg"
                onChange={onImageHandler}
              />
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
            onClick={onSaveUserInfo}
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
