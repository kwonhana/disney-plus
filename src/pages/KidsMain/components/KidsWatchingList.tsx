import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.css';
import '../../Main/scss/movieList.scss';
import { Pagination } from 'swiper/modules';
import { NowWatchListData } from '../../../store/data';
import { Link, useMatch } from 'react-router-dom';
import HeaderTitle from '../../Main/components/HeaderTitle';

//TODO 현재 시청 중인 콘텐츠
// ? 로그인 전에는 노출 불가
const WatchList = () => {
    const isKids = !!useMatch("/kids/*");
    return (
        <section className="WatchList movieList pullInner marginUp">
            <HeaderTitle mainTitle="@@@님이 시청중인 콘텐츠" />
            <>
                <Swiper
                    slidesPerView={4.3}
                    spaceBetween={20}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Pagination]}
                    className="mySwiper">
                    {NowWatchListData.map((el) => {
                        return (
                            <SwiperSlide>
                                <Link className="flex" to="void">
                                    <div className={`movieThumbnail row ${isKids ? "kids" : ""}`}>
                                        <img
                                            src={`https://image.tmdb.org/t/p/w500/${el.backdrop_path}`}
                                            alt={`${el.title} 썸네일`}
                                        />
                                        <span className="movieTitle">{el.title}</span>
                                    </div>
                                    <div className="progressBar">
                                        <div className="now" style={{ width: `${el.WatchBar}%` }}>
                                            progressBar
                                        </div>
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

export default WatchList;
