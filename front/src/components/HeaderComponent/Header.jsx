import React, { useState } from "react";
import userDummy from "../../assets/js/userDummy";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faUserCircle,
} from "@fortawesome/free-regular-svg-icons";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";

const Header = ({ auth }) => {
  console.log("auth", auth);
  const [userInfo, setuserInfo] = useState(userDummy);
  return (
    <>
      <header className="header">
        <nav>
          <h1 className="header__logo">
            <a href="/">logo</a>
          </h1>
          <span className="header__utils">
            {auth ? (
              <>
                <a href="/signup" className="header__signup" title="회원가입">
                  <FontAwesomeIcon icon={faSignInAlt} />
                </a>
                <a href="/login" className="header__login" title="로그인">
                  <FontAwesomeIcon icon={faUserCircle} />
                </a>
              </>
            ) : (
              <>
                <a href="/mypage" className="header__login" title="마이페">
                  <FontAwesomeIcon icon={faPaperPlane} />
                </a>
              </>
            )}
          </span>
        </nav>
      </header>
    </>
  );
};

export default Header;
