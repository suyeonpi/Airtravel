import React, { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function PasswordChange(props) {
  const [userPrePW, setUserPrePw] = useState("");
  const [userNewPW, setUserNewPW] = useState("");
  const [userNewPW2, setUserNewPW2] = useState("");
  const [inputAlertMsg, setInputAlertMsg] = useState(false);
  const [positiveMsg, setPositiveMsg] = useState(false);
  const [inputAlertMsgContent, setinputAlertMsgContent] = useState("test");
  const [canSubmit, setCanSubmit] = useState(false);

  const prePWInput = useRef();
  const newPWInput = useRef();
  const newPW2Input = useRef();

  const onSubmit = (event) => {
    event.preventDefault();

    if (validateLoginForm()) {
      setInputAlertMsg(false);
      setinputAlertMsgContent(false);
      setPositiveMsg(false);

      axios
        .patch(
          "http://localhost:3000/users/updatePW",
          {
            currentPassword: userPrePW,
            password: userNewPW,
            passwordConfirm: userNewPW2,
          },
          {
            headers: { Authorization: `Bearer ${localStorage.token}` },
          }
        )
        .then((res) => {
          localStorage.token = res.data.newToken;
          setInputAlertMsg(true);
          setPositiveMsg(true);
          setinputAlertMsgContent("비밀번호가 변경되었습니다.");
          setUserPrePw("");
          setUserNewPW("");
          setUserNewPW2("");
          setCanSubmit(false);
        })
        .catch((err) => {
          setInputAlertMsg(true);
          if (err.response) {
            setinputAlertMsgContent(err.response.data.message);
          } else {
            setinputAlertMsgContent("서버 요청에 문제가 있습니다.");
          }
        });
    }
  };

  const validateLoginForm = () => {
    //더 강한 클라이언트 사이드 Validation 로직 필요.
    if (
      !(userPrePW.length > 0 && userNewPW.length > 0 && userNewPW2.length > 0)
    ) {
      setInputAlertMsg(true);
      setinputAlertMsgContent("폼 정보를 모두 입력해주세요.");

      if (userPrePW.length === 0) {
        prePWInput.current.focus();
      } else if (userNewPW.length === 0) {
        newPWInput.current.focus();
      } else {
        newPW2Input.current.focus();
      }
      return false;
    }

    if (userNewPW.length < 8) {
      setInputAlertMsg(true);
      setinputAlertMsgContent("비밀번호는 최소 8자 이상 입력해주세요.");
      newPWInput.current.focus();
      return false;
    }

    if (userNewPW2.length < 8) {
      setInputAlertMsg(true);
      setinputAlertMsgContent("비밀번호는 최소 8자 이상 입력해주세요.");
      newPW2Input.current.focus();
      return false;
    }

    if (userNewPW !== userNewPW2) {
      setInputAlertMsg(true);
      setinputAlertMsgContent("비밀번호가 일치하지 않습니다.");
      newPWInput.current.focus();
      return false;
    }

    return true;
  };

  const activateSubmitBtn = () => {
    if (
      prePWInput.current.value.length > 0 &&
      newPWInput.current.value.length > 0 &&
      newPW2Input.current.value.length > 0
    ) {
      setCanSubmit(true);
    } else {
      setCanSubmit(false);
    }
  };

  const onChangeUserPrePW = (event) => {
    setUserPrePw(event.target.value);
    activateSubmitBtn();
    setInputAlertMsg(false);
  };

  const onChangeUserNewPW = (event) => {
    setUserNewPW(event.target.value);
    activateSubmitBtn();
    setInputAlertMsg(false);
  };

  const onChangeUserNewPW2 = (event) => {
    setUserNewPW2(event.target.value);
    activateSubmitBtn();
    setInputAlertMsg(false);
  };

  return (
    <div className="password__change">
      <form onSubmit={onSubmit} className="password__change-form" action="">
        <div className="title">계정 정보 변경</div>
        <div className="divider"></div>
        <input
          ref={prePWInput}
          value={userPrePW}
          onChange={onChangeUserPrePW}
          type="password"
          placeholder="이전 비밀번호"
        />
        <input
          ref={newPWInput}
          value={userNewPW}
          onChange={onChangeUserNewPW}
          type="password"
          placeholder="새 비밀번호"
        />
        <input
          ref={newPW2Input}
          value={userNewPW2}
          onChange={onChangeUserNewPW2}
          type="password"
          placeholder="새 비밀번호 확인"
        />
        <div className={inputAlertMsg ? "msg-active" : "msg-inactive"}>
          <span className={positiveMsg ? "pos-msg-active" : "err-msg-active"}>
            {inputAlertMsgContent}
          </span>
        </div>
        <input
          disabled={canSubmit ? false : true}
          className={
            canSubmit
              ? "btn btn__primary btn__large"
              : "btn btn__disabled btn__large"
          }
          type="submit"
          value="비밀번호 변경"
        />
      </form>
    </div>
  );
}

export default PasswordChange;
