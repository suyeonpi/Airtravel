import React from "react";
import Slider from "react-slick";
import All from "../../assets/images/@bg-cate-all.jpg";

const CategoryList = ({ categories, onPageTurn }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 360,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className="categories">
        <h2 className="categories-title"> 카테고리 </h2>
        <Slider {...settings}>
          {categories.map((category, idx) => {
            return (
              <div
                className="categories__item"
                onClick={() => onPageTurn(idx)}
                key={`${idx}-${category}`}
              >
                <span className="categories__thumbnail">
                  <img src={All} alt="" />
                </span>
                <strong>{category}</strong>
              </div>
            );
          })}
        </Slider>
      </div>
    </>
  );
};

export default CategoryList;

// <div className="categories__item">
// <span className="categories__thumbnail">
//   <img src={All} alt="" />
// </span>
// <strong>아시아</strong>
// </div>
// <div className="categories__item">
// <span className="categories__thumbnail">
//   <img src={All} alt="" />
// </span>
// <strong>아프리카</strong>
// </div>
// <div className="categories__item">
// <span className="categories__thumbnail">
//   <img src={All} alt="" />
// </span>
// <strong>남아메리카</strong>
// </div>
// <div className="categories__item">
// <span className="categories__thumbnail">
//   <img src={All} alt="" />
// </span>
// <strong>북아메리카</strong>
// </div>
