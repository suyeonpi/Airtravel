import React, { useState, useRef, useReducer } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function SignupPage(props) {
  const [userID, setuserID] = useState("");
  const [userNick, setuserNick] = useState("");
  const [userPW, setuserPW] = useState("");
  const [userPW2, setuserPW2] = useState("");
  const [inputAlertMsg, setInputAlertMsg] = useState(false);
  const [positiveMsg, setPositiveMsg] = useState(false);
  const [inputAlertMsgContent, setInputAlertMsgContent] = useState("");

  const idInput = useRef();
  const nickInput = useRef();
  const pwInput = useRef();
  const pw2Input = useRef();
  const navigate = useNavigate();

  const checkAlreadyUsed = (event) => {
    event.preventDefault();
    if (validateIdInput()) {
      setInputAlertMsg(false);
      setPositiveMsg(false);

      axios
        .post("http://localhost:3000/users/checkid", {
          username: userID,
        })
        .then((res) => {
          setInputAlertMsg(true);
          setInputAlertMsgContent("사용 가능한 아이디입니다.");
          setPositiveMsg(true);
        })
        .catch((err) => {
          setInputAlertMsg(true);
          idInput.current.focus();
          setInputAlertMsgContent(err.response.data.message);
        });
    }
  };

  const validateIdInput = () => {
    if (userID.length === 0) {
      setInputAlertMsg(true);
      idInput.current.focus();
      setInputAlertMsgContent("아이디를 입력해주세요.");
      return false;
    }
    return true;
  };

  const onSubmitSignUpForm = (event) => {
    event.preventDefault();
    setInputAlertMsg(false);
    setPositiveMsg(false);

    if (validateLoginForm()) {
      //[API] [POST] 회원가입 요청 보내는 작업.
      axios
        .post("http://localhost:3000/users/signup", {
          username: userID,
          usernick: userNick,
          password: userPW2,
          passwordConfirm: userPW2,
        })
        .then((res) => {
          // console.log("res", res);
          localStorage.token = res.data.token;
          setuserID("");
          setuserNick("");
          setuserPW("");
          setuserPW2("");
          navigate("/");
        })
        .catch((err) => {
          setInputAlertMsg(true);
          setInputAlertMsgContent(err.response.data.message);
        });
    } else {
      // console.log("input error!");
      // 클라인어트 사이드 Validation 에러 표시.
    }
  };

  const validateLoginForm = () => {
    //더 강한 클라이언트 사이드 Validation 로직 필요.
    if (
      !(
        userID.length > 0 &&
        userPW.length > 0 &&
        userPW2.length > 0 &&
        userNick.length > 0
      )
    ) {
      setInputAlertMsg(true);
      setInputAlertMsgContent("폼 정보를 모두 입력해주세요.");

      if (userID.length === 0) {
        idInput.current.focus();
      } else if (userNick.length === 0) {
        nickInput.current.focus();
      } else if (userPW.length === 0) {
        pwInput.current.focus();
      } else {
        pw2Input.current.focus();
      }
      return false;
    }

    if (userPW.length < 8) {
      setInputAlertMsg(true);
      setInputAlertMsgContent("비밀번호는 최소 8자 이상 입력해주세요.");
      pwInput.current.focus();
      return false;
    }

    if (userPW2.length < 8) {
      setInputAlertMsg(true);
      setInputAlertMsgContent("비밀번호는 최소 8자 이상 입력해주세요.");
      pw2Input.current.focus();
      return false;
    }

    if (userPW !== userPW2) {
      setInputAlertMsg(true);
      setInputAlertMsgContent("비밀번호가 일치하지 않습니다.");
      pwInput.current.focus();
      return false;
    }

    return true;
  };

  const onChangeUserID = (event) => {
    setuserID(event.target.value);
    setInputAlertMsg(false);
  };

  const onChangeUserNick = (event) => {
    setuserNick(event.target.value);
    setInputAlertMsg(false);
  };

  const onChangeUserPW = (event) => {
    setuserPW(event.target.value);
    setInputAlertMsg(false);
  };

  const onChangeUserPW2 = (event) => {
    setuserPW2(event.target.value);
    setInputAlertMsg(false);
  };

  return (
    <div className="signup signup-container">
      <form onSubmit={onSubmitSignUpForm} className="signup-form">
        <div className="signup-form title">회원가입</div>
        <div className="divider"></div>
        <div className="id__wrap">
          <input
            value={userID}
            ref={idInput}
            autoFocus
            type="text"
            placeholder="아이디"
            onChange={onChangeUserID}
          />
          <input
            onClick={checkAlreadyUsed}
            className="btn btn__small btn__primary-outline"
            type="button"
            value="중복확인"
          />
        </div>
        <input
          value={userNick}
          ref={nickInput}
          type="text"
          placeholder="닉네임"
          onChange={onChangeUserNick}
        />
        <input
          value={userPW}
          ref={pwInput}
          type="password"
          placeholder="비밀번호"
          onChange={onChangeUserPW}
        />
        <input
          value={userPW2}
          ref={pw2Input}
          type="password"
          placeholder="비밀번호 확인"
          onChange={onChangeUserPW2}
        />
        <div className={inputAlertMsg ? "msg-active" : "msg-inactive"}>
          <span className={positiveMsg ? "pos-msg-active" : "err-msg-active"}>
            {inputAlertMsgContent}
          </span>
        </div>
        <input
          className="btn btn__primary btn__large"
          type="submit"
          value="회원가입"
        />
        <div className="divider"></div>
        <div className="signup__question">
          <div className="signup__question-text">
            <span>이미 계정이 있으신가요?</span>
          </div>
          <Link to="/login">
            <input
              className="btn btn__light btn__large"
              type="button"
              value="로그인"
            />
          </Link>
        </div>
      </form>
    </div>
  );
}

export default SignupPage;
