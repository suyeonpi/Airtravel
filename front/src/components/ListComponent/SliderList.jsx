import React from "react";
import Slider from "react-slick";
import slider1 from "../../assets/images/@img-slider-1.jpg";
import slider2 from "../../assets/images/@img-slider-2.jpg";
import slider3 from "../../assets/images/@img-slider-3.jpg";

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
