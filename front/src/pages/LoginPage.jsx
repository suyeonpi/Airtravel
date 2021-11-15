import React from "react";

function LoginPage(props) {
  return (
    <div className="login login-container">
      <div className="login-form">
        <div className="login-form title">로그인</div>
        <div className="divider"></div>
        <input type="text" placeholder="아이디" />
        <input type="password" placeholder="비밀번호" />
        <input
          className="btn btn__primary btn__large"
          type="button"
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
      </div>
    </div>
  );
}

export default LoginPage;
