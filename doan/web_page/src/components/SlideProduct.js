import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import Product from "./Product";

const SlideProduct = ({ data }) => {
  return (
    <Swiper
      navigation={true}
      slidesPerView={5}
      spaceBetween={25}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      loopFillGroupWithBlank={false}
      modules={[Autoplay, Navigation]}
      className="mySwiper"
    >
      {data.map((item, index) => {
        return (
          <SwiperSlide key={index}>
            <Product data={item} />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default SlideProduct;
