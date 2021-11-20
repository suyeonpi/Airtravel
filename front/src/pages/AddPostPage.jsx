import React, { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function AddPostPage(props) {
  return (
    <div className="addPost">
      <div className="wrapper">
        {/* image */}
        <div className="diary-image">
          <img
            src="https://s3.ap-northeast-2.amazonaws.com/elasticbeanstalk-ap-northeast-2-176213403491/media/magazine_img/magazine_286/84-%EC%8D%B8%EB%84%A4%EC%9D%BC.jpg"
            alt="image"
          />
        </div>
        {/* content */}
        <div className="content">
          <div className="diary-userinfo">
            <div className="profile"></div>
            <span>sajeon</span>
          </div>

          {/* 카드 추가 입력 폼 */}
          <div className="add-form">
            {/* 대륙 카테고리 선택 */}
            <div className="row-top">
              <span>카테고리 선택</span>
              <select className="continent-select" name="" id="">
                <option value="아시아">아시아</option>
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
              <input type="text" value="뉴욕씨티 서울 어딘가 한복판" />
            </div>

            {/* 여행 일자 선택 */}
            <div className="row-top diary-calender">
              <span>여행 일자 선택</span>
              <input type="date" />
            </div>

            <div className="divider"></div>

            {/* 제목 */}
            <div className="row-bottom diary-title">
              <div>
                <span>제목</span>
              </div>
              <input
                type="text"
                value="뉴욕씨티 서울 어딘가 한복판 제목은 뭘로할거인가아요..."
              />
            </div>

            {/* 내용 */}
            <div className="row-bottom diary-content">
              <div>
                <span>내용</span>
              </div>
              <textarea name="" id="" cols="30" rows="10">
                뉴욕씨티 서울 어딘가 한복판 제목은
                뭘로할것인가아요...뉴욕햄버거는 지 뉴욕 피자도 맛있고 맥앤치즈도
                맛나 쿠키와 베이글 팬케이크 뉴욕하면 우유가 맛있지
                우유는어디까지 쓸 수 있는걸까 이거는 맥시멈 길이가 어디인거
              </textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddPostPage;
