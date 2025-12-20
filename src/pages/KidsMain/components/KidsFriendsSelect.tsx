
import HeaderTitle from '../../Main/components/HeaderTitle'
import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import "../scss/KidsFriendsSelect.scss";
import { Link } from 'react-router-dom';
import { characterMovieData } from '../../../store/kidsMovieData';



const KidsFriendsSelect = () => {

    return (
        <section className="frindsSelect pullInner movieList">
            <HeaderTitle mainTitle="디즈니+ 친구들" />
            <>
                <Swiper
                    slidesPerView={6.7}
                    spaceBetween={3}
                    modules={[Pagination]}
                >
                    {characterMovieData.map((i) => (
                        <SwiperSlide key={i.id}>
                            <div className="imgBox">
                                <Link to={`/kids/${encodeURIComponent(i.id)}`}>
                                    <img src={i.img} alt={i.name} />
                                </Link>

                            </div>

                        </SwiperSlide>
                    ))}
                </Swiper>
            </>
        </section>
    )
}

export default KidsFriendsSelect