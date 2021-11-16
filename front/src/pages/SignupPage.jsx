import React from "react";

function SignupPage(props) {
  return (
    <div className="signup signup-container">
      <form className="signup-form">
        <div className="signup-form title">회원가입</div>
        <div className="divider"></div>
        <div className="id__wrap">
          <input autoFocus type="text" placeholder="아이디" />
          <input
            className="btn btn__small btn__primary-outline"
            type="button"
            value="중복확인"
          />
        </div>
        <input type="password" placeholder="비밀번호" />
        <input type="password" placeholder="비밀번호 확인" />
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
          <input
            className="btn btn__light btn__large"
            type="button"
            value="로그인"
          />
        </div>
      </form>
    </div>
  );
}

export default SignupPage;
