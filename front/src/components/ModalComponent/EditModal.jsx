import React, { useState } from "react";

const EditModal = ({ userInfo, onChangeUser }) => {
  const [newInfo, setNewInfo] = useState(userInfo.usernick);

  const onEditImg = () => {};
  const onChangeNick = (e) => setNewInfo((prev) => (prev = e.target.value));

  return (
    <>
      <div className="modal modal-edit">
        <h3 className="modal-title">프로필 편집</h3>
        <div className="divider"></div>
        {/*  */}
        <div className="modal-content">
          <div className="input-util input__edit-nick">
            <span className="title title__small">닉네임</span>
            <input
              id="editNick"
              name="usernick"
              type="text"
              value={newInfo}
              onChange={() => onChangeUser()}
            />
          </div>
          {/*  */}

          <div className="input-util input__edit-img">
            <span className="title title__small">프로필 사진</span>
            <div className="">
              <label htmlFor="editProfileImg">수정</label>
              <input type="file" name="" id="editProfileImg" />
            </div>
          </div>
          {/*  */}
          <div className="input-util input__edit-banner">
            <label className="title title__small">배너 사진</label>
            <div className="">
              <label htmlFor="editBanner">수정</label>
              <input id="editBanner" type="file" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditModal;
