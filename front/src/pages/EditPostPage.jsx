import React, { useState, useRef, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

function AddPostPage(props) {
  const [diaryContinent, setDiaryContinent] = useState("아시아");
  const [diaryLocation, setDiaryLocation] = useState("");
  const [diaryDate, setDiaryDate] = useState("");
  const [diaryContent, setDiaryContent] = useState("");
  const [preview, setPreview] = useState();

  const fileInputRef = useRef();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/v1/cards/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      })
      .then((res) => {
        const data = res.data.card;

        setDiaryContinent(data.continent);
        setDiaryLocation(data.location);
        setDiaryDate(data.date.slice(0, 10));
        setDiaryContent(data.content);
        setPreview(data.picture_url);
      });
  }, []);

  const onSubmitAddPostForm = (event) => {
    event.preventDefault();

    const fd = new FormData();

    fd.append("location", diaryLocation);
    fd.append("date", diaryDate);
    fd.append("content", diaryContent);
    fd.append("continent", diaryContinent);

    console.log(diaryContent);

    axios
      .patch(`http://localhost:8080/api/v1/cards/${id}`, fd, {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      })
      .then((res) => {
        console.log("content change!");
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
            <span className="photo__name" style={{ visibility: "hidden" }}>
              <FontAwesomeIcon icon={faTimes} className="photo__name-icon" />
            </span>
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
                    value={diaryContinent}
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
                  <input
                    value={diaryLocation}
                    type="text"
                    onChange={onChangeLocation}
                  />
                </div>

                {/* 여행 일자 선택 */}
                <div className="row-top diary-calender">
                  <span>여행 일자 선택</span>
                  <input
                    value={diaryDate}
                    type="date"
                    onChange={onChangeDate}
                  />
                </div>

                <div className="divider"></div>

                {/* 내용 */}
                <div className="row-bottom diary-content">
                  <div>
                    <span>내용</span>
                  </div>
                  <textarea
                    value={diaryContent}
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
                  value="수정"
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
