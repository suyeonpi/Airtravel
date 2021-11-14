import React from "react";

const Header = () => {
  return (
    <>
      <header className="header">
        <nav>
          <h1 className="header__logo">
            <a href="/">logo</a>
          </h1>
          <span className="header__mypage">
            <a href="#mypage">mypage</a>
          </span>
        </nav>
      </header>
    </>
  );
};

export default Header;
