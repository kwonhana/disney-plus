import '../scss/ThemeList.scss';
import 'swiper/swiper.css';
import { ThemeListNavData } from '../../../store/data';
import { useMovieStore } from '../../../store/useMovieStore';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';

//TODO 테마별 콘텐츠
const ThemeList = () => {
  const { onfetchTheme, themeMovies, isLoading } = useMovieStore();
  const [activeTheme, setActiveTheme] = useState(ThemeListNavData[0].title);

  //TODO 현재 선택된 테마의 데이터를 찾습니다.
  const activeThemeData = ThemeListNavData.find((v) => v.title === activeTheme);
  //TODO 현재 선택된 테마의 코드를 찾습니다.
  const activeThemeId = activeThemeData?.companyId ?? '';
  const activeThemeText = activeThemeData?.text ?? '';

  //  최초 1회만 fetch
  const fetchedRef = useRef(false);

  useEffect(() => {
    if (!activeThemeId || fetchedRef.current) return;
    fetchedRef.current = true;
    onfetchTheme(activeThemeId);
  }, [activeThemeId]);

  const skeletonClassName = isLoading ? 'skeleton' : 'hidden skeleton';

  return (
    <section className="ThemeList">
      <nav className="menu">
        <ul>
          {ThemeListNavData.map((v, i) => (
            <li
              key={i}
              className={`${v.title} ${v.title === activeTheme ? 'active' : ''}`}
              onClick={() => {
                setActiveTheme(v.title);
                fetchedRef.current = false;
              }}
            />
          ))}
        </ul>

        <div className="ThemeList">
          <div className="themeText">
            <p>{activeThemeText}</p>
            <button>둘러보기</button>
          </div>

          <div className="themeMovie">
            {/* {isLoading && <div className="skeleton" />} */}
            <div className={skeletonClassName}>
              <div className="div"></div>
              <div className="div"></div>
              <div className="div"></div>
              <div className="div"></div>
              <div className="div"></div>
            </div>

            {!isLoading && themeMovies.length > 0 && (
              <Swiper slidesPerView={4.4} spaceBetween={20}>
                {themeMovies
                  .filter((el) => el.poster_path)
                  .slice(0, 10)
                  .map((el) => (
                    <SwiperSlide key={el.id}>
                      <Link to={`/play/movie/${el.id}`}>
                        <img
                          src={`https://image.tmdb.org/t/p/w500${el.poster_path}`}
                          alt={el.title}
                        />
                      </Link>
                    </SwiperSlide>
                  ))}
              </Swiper>
            )}
          </div>
        </div>
      </nav>
    </section>
  );
};

export default ThemeList;
