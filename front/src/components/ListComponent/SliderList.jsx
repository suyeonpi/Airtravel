import React from "react";
import Slider from "react-slick";

const Sliderlist = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      <div className="slider__wrap">
        <Slider {...settings}>
          <div className="slider__img-1"></div>
          <div className="slider__img-2"></div>
          <div className="slider__img-3"></div>
        </Slider>
      </div>
    </>
  );
};

export default Sliderlist;
