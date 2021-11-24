import React, { useState, useRef, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import axios from "axios";
import Picker from "emoji-picker-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/fontawesome-free-solid";

function DetailViewPage(props) {
  const [CardContent, setCardContent] = useState();
  const [CardContinent, setCardContinent] = useState();
  const [CardDate, setCardDate] = useState();
  const [CardLikeCount, setCardLikeCount] = useState();
  const [CardLocation, setCardLocation] = useState();
  const [CardPicture, setCardPicture] = useState();

  const [OwnerProfile, setOwnerProfile] = useState();
  const [OwnerNickName, setOwnerNickName] = useState();

  const [CardComments, setCardComments] = useState([]);

  const [commentRow, setCommentRow] = useState(1);
  const [userNewComment, setUserNewComment] = useState("");

  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [emojiMenuShow, setEmojiMenuShow] = useState("none");

  const { id } = useParams();

  const textAreaInput = useRef();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/v1/cards/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      })
      .then((res) => {
        const data = res.data.card;
        console.log("data", data);

        setCardContent(data.content);
        setCardContinent(data.continent);
        setCardDate(data.date);
        setCardLikeCount(data.like_count);
        setCardLocation(data.location);
        setCardPicture(data.picture_url);

        setOwnerProfile(data.userId.user_url);
        setOwnerNickName(data.userId.usernick);
      });

    axios
      .get(`http://localhost:8080/api/v1/comments/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      })
      .then((res) => {
        // console.log("data", res.data.comments);
        setCardComments(res.data.comments);
      });
  }, []);

  const getDate = (date) => {
    const arr = String(date).slice(0, 10).split("-");
    return `${arr[0].slice(2)}.${arr[1]}.${arr[2]}`;
  };

  const onChangeComment = (event) => {
    const rows = event.target.value.split("\n").length;
    // console.log(rows);
    setCommentRow(rows);
    setUserNewComment(event.target.value);
  };

  const onEmojiClick = (event, emojiObject) => {
    // console.log("emoji select!");
    setChosenEmoji(emojiObject);
    setUserNewComment((prev) => {
      return prev + emojiObject.emoji;
    });
    setEmojiMenuShow("none");
  };

  const onClickAddNewComment = () => {
    // console.log("add!!");
    axios
      .post(
        `http://localhost:8080/api/v1/comments/${id}`,
        { text: userNewComment },
        {
          headers: { Authorization: `Bearer ${localStorage.token}` },
        }
      )
      .then((res) => {
        // console.log("data", res.data);
        setUserNewComment("");
        setCommentRow(1);

        axios
          .get(`http://localhost:8080/api/v1/comments/${id}`, {
            headers: { Authorization: `Bearer ${localStorage.token}` },
          })
          .then((res) => {
            console.log("data", res.data.comments);
            setCardComments(res.data.comments);
          });
      });
  };

  return (
    <div className="detailView">
      <div className="wrapper">
        {/* image */}
        <div className="diary-image">
          <img
            src={CardPicture}
            alt="업로드이미지"
            className="image__selected"
          />
          <div className="diary-subinfo">
            <div>
              <div className="subinfo-row">{CardContinent}</div>
              <div className="subinfo-row">{CardLocation}</div>
              <div className="subinfo-row">{getDate(CardDate)}</div>
            </div>
            <div style={{ fontSize: "20px" }}>
              <FontAwesomeIcon
                style={{ marginRight: "0.8rem" }}
                icon={["fas", "heart"]}
                color="red"
              />
              <span>{CardLikeCount}</span>
            </div>
          </div>
        </div>
        {/* content */}
        <div className="content">
          <div className="content-innerwrap">
            {/* 카드 콘텐츠 */}
            <div className="add-form">
              <div className="comments-wrap">
                {/* 게시글 콘텐츠 */}
                <div className="owner-info">
                  {OwnerProfile ? (
                    <img className="owner-profile" src={OwnerProfile} />
                  ) : (
                    <div className="owner-img"></div>
                  )}
                  <div className="owner-nickname">{OwnerNickName}</div>
                </div>
                <div className="owner-content">{CardContent}</div>

                {/* 댓글 공간 */}
                {CardComments.map((comment) => (
                  <div className="content-comment">
                    <div className="commenter-info">
                      {comment.userId.user_url ? (
                        <img
                          className="commenter-profile"
                          src={comment.userId.user_url}
                          alt=""
                        />
                      ) : (
                        <div className="commenter-img"></div>
                      )}
                      <div className="commenter-nickname">
                        {comment.userId.usernick}
                      </div>
                    </div>
                    <div className="commenter-content">{comment.text}</div>
                  </div>
                ))}
              </div>
              {/* 댓글 입력 폼 */}
              <div className="new-commentbox">
                <div>
                  <Picker
                    pickerStyle={{
                      position: "absolute",
                      bottom: "100%",
                      display: emojiMenuShow,
                    }}
                    onEmojiClick={onEmojiClick}
                  />
                  <div
                    className="emoji-picker"
                    onClick={() => {
                      console.log("click!");
                      setEmojiMenuShow("flex");
                    }}
                  >
                    <svg
                      fill="teal"
                      viewBox="0 0 24 24"
                      width="35px"
                      height="35px"
                    >
                      <path d="M15.83 10.997a1.167 1.167 0 101.167 1.167 1.167 1.167 0 00-1.167-1.167zm-6.5 1.167a1.167 1.167 0 10-1.166 1.167 1.167 1.167 0 001.166-1.167zm5.163 3.24a3.406 3.406 0 01-4.982.007 1 1 0 10-1.557 1.256 5.397 5.397 0 008.09 0 1 1 0 00-1.55-1.263zM12 .503a11.5 11.5 0 1011.5 11.5A11.513 11.513 0 0012 .503zm0 21a9.5 9.5 0 119.5-9.5 9.51 9.51 0 01-9.5 9.5z"></path>
                    </svg>
                  </div>
                </div>

                <textarea
                  ref={textAreaInput}
                  value={userNewComment}
                  rows={commentRow}
                  placeholder="댓글 달기..."
                  onChange={onChangeComment}
                ></textarea>

                <input
                  onClick={onClickAddNewComment}
                  type="submit"
                  className="btn btn__primary"
                  value="댓글달기"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailViewPage;
