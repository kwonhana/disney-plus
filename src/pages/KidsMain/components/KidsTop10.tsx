import "../scss/KidsMovieList.scss";
import "../../Main/scss/Top10List.scss";
import { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link, useMatch } from 'react-router-dom';
import type { title } from '../../../types/IMovie';
import HeaderTitle from '../../Main/components/HeaderTitle';
import { useKidsMoiveStore } from '../../../store/useKidsMovieStore';



//TODO 탑10 리스트

const KidsTop10 = ({ title }: title) => {
    const kids = useMatch("/kids/*")
    const { onFetchTop10Movies, kidsTopMovie } = useKidsMoiveStore()

    useEffect(() => {
        if (kidsTopMovie.length === 0) {
            onFetchTop10Movies()
        }
    }, [kidsTopMovie, onFetchTop10Movies]);

    return (
        <section className="Top10List">
            <HeaderTitle mainTitle={title} />
            <Swiper slidesPerView={4.2} spaceBetween={20} className="mySwiper">
                {kidsTopMovie.slice(0, 7).map((el, i) => (
                    <SwiperSlide>
                        <Link to={`/play/movie/${el.id}`}>
                            <div className={`movieThumbnail TopNumber number${1 + i}`}>
                                <div className={`imgBox ${kids ? "kids" : ""}`}>
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500/${el.poster_path}`}
                                        alt={`${el.title} 썸네일`}
                                    />
                                </div>
                            </div>
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default KidsTop10;
