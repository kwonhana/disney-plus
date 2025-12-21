import { useEffect } from 'react';
import '../../Main/scss/movieList.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { Link, useMatch } from 'react-router-dom';
import HeaderTitle from '../../Main/components/HeaderTitle';
import { useKidsMoiveStore } from '../../../store/useKidsMovieStore';

interface GenreListProps {
    genreId: string;
    title: string;
}

const KidsGenreList = ({ genreId, title }: GenreListProps) => {
    const { category, onFetchKidsCate } = useKidsMoiveStore();
    const isKids = useMatch("/kids/*");

    const GenreMovies = category[genreId] || [];

    useEffect(() => {
        if (!category[genreId]) {
            onFetchKidsCate(genreId);
        }
        // console.log('????????', GenreMovies);
    }, [genreId, category, onFetchKidsCate]);

    return (
        <section className="GenreList movieList pullInner">
            <HeaderTitle mainTitle={title} />
            <Swiper
                slidesPerView={6.2}
                spaceBetween={20}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper">
                {GenreMovies.map((el) => {
                    return (
                        <SwiperSlide>
                            <Link className="" to={`/play/movie/${el.id}`}>
                                <div className={`col movieThumbnail ${isKids ? 'kids' : ''}`}>
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
        </section>
    );
};

export default KidsGenreList;
