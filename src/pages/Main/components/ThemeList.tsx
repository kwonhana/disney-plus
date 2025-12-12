import '../scss/ThemeList.scss';
import 'swiper/swiper.css';
import { ThemeListNavData } from '../../../store/data';
import { useMovieStore } from '../../../store/useMovieStore';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';

//TODO 테마별 콘텐츠
const ThemeList = () => {
  const { onfetchTheme, theme } = useMovieStore();
  const [activeTheme, setActiveTheme] = useState(ThemeListNavData[0].title);

  //TODO 현재 선택된 테마의 데이터를 찾습니다.
  const activeThemeData = ThemeListNavData.find((v) => v.title === activeTheme);
  const activeThemeText = activeThemeData?.text ?? '';

  //TODO 현재 선택된 테마의 코드를 찾습니다.
  const activeThemeId = activeThemeData?.companyId ?? '';

  const handleNavClick = (title: string) => {
    setActiveTheme(title);
  };

  useEffect(() => {
    if (activeThemeId) {
      onfetchTheme(activeThemeId);
    }
  }, [onfetchTheme, activeThemeId]);

  return (
    <section className="ThemeList">
      {/* 1번 */}
      <nav>
        <ul>
          {ThemeListNavData.map((v, i) => {
            const isActive = v.title === activeTheme;
            return (
              <li
                key={i}
                className={` ${v.title} ${isActive ? 'active' : ''}`}
                onClick={() => handleNavClick(v.title)}></li>
            );
          })}
        </ul>
        <div className="ThemeList">
          <div className="themeText">
            <p>{activeThemeText}</p>
            <button>둘러보기</button>
          </div>
          <div className="themeMovie">
            <Swiper
              slidesPerView={4.4}
              spaceBetween={20}
              pagination={{
                clickable: true,
              }}
              className="mySwiper">
              {theme &&
                theme
                  .filter((el) => el.poster_path)
                  .slice(0, 10)
                  .map((el) => (
                    <SwiperSlide>
                      <Link className="" to="void">
                        <div key={el.id} className="movie-card">
                          {/* 실제 영화 정보 렌더링: 포스터, 제목 등을 표시 */}
                          <img
                            src={`https://image.tmdb.org/t/p/w500${el.poster_path}`}
                            alt={el.title || el.name}
                          />
                          <p>{el.title || el.name}</p>
                        </div>
                      </Link>
                    </SwiperSlide>
                  ))}
              );
            </Swiper>
          </div>
        </div>
      </nav>
    </section>
  );
};

export default ThemeList;
