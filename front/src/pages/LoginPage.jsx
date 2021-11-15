import React from "react";

function LoginPage(props) {
  return (
    <div className="login__container">
      <div className="login__form">
        <div className="login__form--title">로그인</div>
        <div className="login__form--divider-top"></div>
        <input
          className="login__form--input login__form--id"
          type="text"
          placeholder="아이디"
        />
        <input
          className="login__form--input login__form--password"
          type="text"
          placeholder="비밀번호"
        />
        <input
          className="login__form--login-button"
          type="button"
          value="로그인"
        />
        <div className="login__form--divider-bottom"></div>
        <div className="question__wrap">
          <div className="question__text">
            <span>아직 회원이 아니신가요?</span>
          </div>
          <input className="question__button" type="button" value="회원가입" />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
