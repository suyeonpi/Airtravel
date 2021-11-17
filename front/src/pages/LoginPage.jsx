import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LoginPage(props) {
  const [userID, setuserID] = useState("");
  const [userPW, setuserPW] = useState("");
  const [inputError, setInputError] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const idInput = useRef();
  const navigate = useNavigate();

  const onSubmit = (event) => {
    event.preventDefault();
    console.log(userID, userPW);

    if (validateLoginForm()) {
      //[API] [GET] 로그인 요청 보내는 작업.
      axios
        .post("http://localhost:3000/users/login", {
          username: userID,
          password: userPW,
        })
        .then((res) => {
          console.log("res", res);
          localStorage.token = res.data.token;
          setuserID("");
          setuserPW("");
          navigate("/");
        })
        .catch((err) => {
          setInputError(true);
          idInput.current.focus();
          setErrMsg(err.response.data.message);
        });
    } else {
      console.log("input error!");
      // 클라인어트 사이드 Validation 에러 표시.
    }
  };

  const validateLoginForm = () => {
    //더 강한 클라이언트 사이드 Validation 로직 필요.
    if (userID.length > 0 && userPW.length > 0) return true;
  };

  const onChangeUserID = (event) => {
    setuserID(event.target.value);
    setInputError(false);
  };

  const onChangeUserPW = (event) => {
    setuserPW(event.target.value);
    setInputError(false);
  };

  return (
    <div className="login login-container">
      <form onSubmit={onSubmit} className="login-form">
        <div className="login-form title">로그인</div>
        <div className="divider"></div>
        <input
          autoFocus
          ref={idInput}
          value={userID}
          type="text"
          placeholder="아이디"
          onChange={onChangeUserID}
        />
        <input
          value={userPW}
          type="password"
          placeholder="비밀번호"
          onChange={onChangeUserPW}
        />
        <div className={inputError ? "err-msg-active" : "err-msg-inactive"}>
          <span>{errMsg}</span>
        </div>
        <input
          className="btn btn__primary btn__large"
          type="submit"
          value="로그인"
        />
        <div className="divider"></div>
        <div className="question question-wrap">
          <div className="question__text">
            <span>아직 회원이 아니신가요?</span>
          </div>
          <input
            className="btn btn__light btn__large"
            type="button"
            value="회원가입"
          />
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
