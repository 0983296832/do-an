import "../../assets/css/slide-product.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper";
import { useState } from "react";
// import ImageZoom from "react-image-zooom";

const ProductImagesSlider = ({ images }) => {
  const [activeThumb, setActiveThumb] = useState();

  return (
    <>
      <Swiper
        loop={true}
        spaceBetween={10}
        navigation={true}
        modules={[Navigation, Thumbs]}
        grabCursor={true}
        thumbs={{ swiper: activeThumb }}
        className="product-images-slider"
      >
        {images.map((item, index) => (
          <SwiperSlide key={index}>
            {/* <ImageZoom
              src={item}
              alt="A image to apply the ImageZoom plugin"
              zoom="200"
            /> */}
            <img src={item} alt="" />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setActiveThumb}
        loop={true}
        spaceBetween={10}
        slidesPerView={images.length < 4 ? images.length : 4}
        modules={[Navigation, Thumbs]}
        className="product-images-slider-thumbs"
        style={{ maxWidth: images.length >= 4 ? "100%" : 300 }}
      >
        {images.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="product-images-slider-thumbs-wrapper">
              <img src={item} alt="product images" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default ProductImagesSlider;
