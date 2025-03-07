
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/scrollbar';
// import 'swiper/css/autoplay';


// import required modules
import { Scrollbar, Autoplay } from 'swiper/modules';

const HeroSwiper = () => {
    return (
        <>
          <Swiper
            scrollbar={{
              hide: true,
            }}
            autoplay={{
                delay: 2500,
                disableOnInteraction: true,
            }}
            loop={true}
            modules={[Scrollbar,Autoplay]}
          >
            <SwiperSlide>
                <img src="/slider-01.jpeg" alt="test-01" />
            </SwiperSlide>
            <SwiperSlide>
                 <img src="/slider-02.jpeg" alt="test-01" />
            </SwiperSlide>
            <SwiperSlide>
                <img src="/slider-03.jpeg" alt="test-01" />
            </SwiperSlide>
          </Swiper>
        </>
      );
}

export default HeroSwiper