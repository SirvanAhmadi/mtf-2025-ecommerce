// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/scrollbar';

// Import required modules
import { Scrollbar, Autoplay } from 'swiper/modules';

const HeroSwiper = () => {
    //Swiper settings
    const swiperSettings = {
        scrollbar: {
            hide: true,
        },
        autoplay: {
            delay: 2500,
            disableOnInteraction: true,
        },
        loop: true,
        modules: [Scrollbar, Autoplay],
    };

    // برای بهینه سازی
    const imageSources = [
        '/slider-01.jpeg',
        '/slider-02.jpeg',
        '/slider-03.jpeg',
    ];

    return (
        <Swiper {...swiperSettings}>
            {imageSources.map((src, index) => (
                <SwiperSlide key={index}>
                    <img src={src} alt={`slider-${index + 1}`} />
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default HeroSwiper;