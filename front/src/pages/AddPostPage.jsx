import React, { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

function AddPostPage(props) {
  const [diaryContinent, setDiaryContinent] = useState("아시아");
  const [diaryLocation, setDiaryLocation] = useState("");
  const [diaryDate, setDiaryDate] = useState("");
  const [diaryContent, setDiaryContent] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const fileInputRef = useRef();

  const [showPicName, setShowPicName] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreview(null);
    }
  }, [selectedFile]);

  const onSubmitAddPostForm = (event) => {
    event.preventDefault();

    const fd = new FormData();

    fd.append("picture_url", selectedFile, selectedFile.name);
    fd.append("location", diaryLocation);
    fd.append("date", diaryDate);
    fd.append("content", diaryContent);
    fd.append("continet", diaryContinent);

    axios
      .post("http://localhost:3000/cards", fd, {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      })
      .then((res) => {
        console.log("file upload!");
        navigate("/mypage");
      });
  };

  const onChangeContinent = (event) => {
    setDiaryContinent(event.target.value);
  };

  const onChangeLocation = (event) => {
    setDiaryLocation(event.target.value);
  };

  const onChangeDate = (event) => {
    setDiaryDate(event.target.value);
  };

  const onChangeContent = (event) => {
    setDiaryContent(event.target.value);
  };

  const fileSelectedHandler = (event) => {
    // console.log(event.target.files[0]);

    const file = event.target.files[0];
    event.target.value = "";

    if (file && file.type.substr(0, 5) === "image") {
      setSelectedFile(file);
      setShowPicName(true);
      console.log(file);
    } else {
      setSelectedFile(null);
      console.log("null!!");
    }
  };

  return (
    <div className="addPost">
      <div className="wrapper">
        {/* image */}
        <div className="diary-image">
          {preview ? (
            <img src={preview} alt="업로드이미지" className="image__selected" />
          ) : (
            <div
              className="image-preview"
              onClick={(event) => {
                event.preventDefault();
                fileInputRef.current.click();
              }}
            >
              사진 업로드
            </div>
          )}
          <div>
            {showPicName ? (
              <div>
                <span
                  type="text"
                  className="photo__name"
                  onClick={() => {
                    setSelectedFile(null);
                    setShowPicName(false);
                  }}
                >
                  {selectedFile.name.length > 10
                    ? selectedFile.name.substr(0, 10) +
                      " ..." +
                      selectedFile.name.split(".")[1]
                    : selectedFile.name}
                  <FontAwesomeIcon
                    icon={faTimes}
                    className="photo__name-icon"
                  />
                </span>
              </div>
            ) : (
              <span className="photo__name" style={{ visibility: "hidden" }}>
                <FontAwesomeIcon icon={faTimes} className="photo__name-icon" />
              </span>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={fileSelectedHandler}
              style={{
                display: "none",
              }}
            />
          </div>
        </div>
        {/* content */}
        <div className="content">
          <form onSubmit={onSubmitAddPostForm}>
            {/* 카드 추가 입력 폼 */}
            <div className="add-form">
              {/* 대륙 카테고리 선택 */}
              <div>
                <div className="row-top">
                  <span>카테고리 선택</span>
                  <select
                    onChange={onChangeContinent}
                    className="continent-select"
                    name=""
                    id=""
                  >
                    <option selected value="아시아">
                      아시아
                    </option>
                    <option value="유렵">유렵</option>
                    <option value="북아메리카">북아메리카</option>
                    <option value="남아메리카">남아메리카</option>
                    <option value="아프리카">아프리카</option>
                    <option value="호주">호주</option>
                  </select>
                </div>

                {/* 여행 장소 및 지역 */}
                <div className="row-top diary-location">
                  <span>여행 장소 및 지역</span>
                  <input type="text" onChange={onChangeLocation} />
                </div>

                {/* 여행 일자 선택 */}
                <div className="row-top diary-calender">
                  <span>여행 일자 선택</span>
                  <input type="date" onChange={onChangeDate} />
                </div>

                <div className="divider"></div>

                {/* 내용 */}
                <div className="row-bottom diary-content">
                  <div>
                    <span>내용</span>
                  </div>
                  <textarea
                    name=""
                    id=""
                    cols="30"
                    rows="10"
                    onChange={onChangeContent}
                  ></textarea>
                </div>
              </div>

              {/* 버튼 */}
              <div className="btn__wrap">
                <input
                  className="btn btn__light btn__small"
                  type="submit"
                  value="취소"
                />
                <input
                  className="btn btn__primary btn__small"
                  type="submit"
                  value="등록"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddPostPage;
