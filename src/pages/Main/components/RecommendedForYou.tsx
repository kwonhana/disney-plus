import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.css';
import { Pagination } from 'swiper/modules';
import { RecommendedForYouData } from '../../../store/data';
import HeaderTitle from './HeaderTitle';
import '../scss/movieList.scss';
import { Link } from 'react-router-dom';

//TODO 사용자 맞춤 추천 목록
const RecommendedForYou = () => {
  return (
    <section className="RecommendedForYou movieList pullInner">
      <HeaderTitle mainTitle="@@@님을 위한 취향저격 콘텐츠" />
      <>
        <Swiper
          slidesPerView={6.2}
          spaceBetween={20}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper">
          {RecommendedForYouData.map((el) => {
            return (
              <SwiperSlide>
                <Link to="void">
                  <div className="movieThumbnail col">
                    <img
                      src={`https://image.tmdb.org/t/p/w500/${el.poster_path}`}
                      alt={`${el.title} 썸네일`}
                    />
                  </div>
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </>
    </section>
  );
};

export default RecommendedForYou;
