
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import axios from 'axios';
import 'swiper/css';
import 'swiper/css/pagination';

interface Slide {
  id: number;
  title: string;
  description: string;
  image: string;
}

const Carousel = () => {
  const [slides, setSlides] = useState<Slide[]>([]);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/carousel/get-slides');
        setSlides(response.data);
      } catch (error) {
        console.error('Error fetching slides:', error);
      }
    };

    fetchSlides();
  }, []);

  if (slides.length === 0) {
    return null;
  }

  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      spaceBetween={30}
      slidesPerView={1}
      autoplay={{
        delay: 2000,
        disableOnInteraction: false,
      }}
      pagination={{ clickable: true, el: '.swiper-pagination' }}
      className="rounded-xl overflow-hidden shadow-2xl"
    >
      {slides.map((slide) => (
        <SwiperSlide key={slide.id}>
          <div className="relative h-[400px]">
            <img
              src={`http://localhost:5001${slide.image}`}
              alt={slide.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-center p-8">
              <div>
                <h2 className="text-3xl font-bold text-white mb-4">{slide.title}</h2>
                <p className="text-xl text-gray-200">{slide.description}</p>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
      <div className="swiper-pagination"></div>
    </Swiper>
  );
};

export default Carousel;