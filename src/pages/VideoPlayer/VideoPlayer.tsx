import './scss/VideoPlayerPage.scss';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import type { TV, Genre, DATA } from '../../types/ITV';
import { useWatchingStore } from '../../store/useWatchingStore';
import { useWishStore } from '../../store/useWishStore';

const VideoPlayer = () => {
  const [player, setPlayer] = useState<DATA>([]);
  const [logo, setLogo] = useState();
  const [videos, setVideos] = useState<any[]>([]);
  const [certification, setCertification] = useState<string>('none');
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const { id, type } = useParams();
  const { onAddWatching, onFetchWatching } = useWatchingStore();
  const { onToggleWish } = useWishStore();
  const navgate = useNavigate();

  useEffect(() => {
    onFetchWatching();
  }, [onFetchWatching]);

  useEffect(() => {
    //TODO 1. 상세 데이터 호출 함수
    const onFetchID = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/${type}/${id}?api_key=${API_KEY}&language=ko-KR`
      );
      const data = await res.json();
      setPlayer(data);
    };
    //TODO 2. 등급 데이터 호출 함수 (TV/Movie 대응)
    const onFetchAge = async () => {
      const endpoint = type === 'movie' ? 'release_dates' : 'content_ratings';
      const resAge = await fetch(
        `https://api.themoviedb.org/3/${type}/${id}/${endpoint}?api_key=${API_KEY}`
      );
      const dataAge = await resAge.json();
      const NLInfo = dataAge.results.find((el) => el.iso_3166_1 === 'NL');
      const cAge =
        type === 'movie'
          ? NLInfo?.release_dates?.[0]?.certification || 'none' // Movie 구조
          : NLInfo?.rating || 'none'; // TV 구조
      console.log('네덜란드 등급 결과:', cAge);
      setCertification(cAge);
    };

    //TODO 3.로고 가지고 오는 함수
    const onFetchLogo = async () => {
      const resLogo = await fetch(
        `https://api.themoviedb.org/3/${type}/${id}/images?api_key=${API_KEY}`
      );
      const dataLogo = await resLogo.json();
      const logoImg = dataLogo.logos?.[0]?.file_path || null;
      setLogo(logoImg);
    };

    //TODO 예고편 재생하기
    const onFetchVideo = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${API_KEY}&language=en-US`
      );
      const data = await res.json();
      // 'Trailer' 타입만 필터링해서 저장하면 더 정확합니다.
      const trailerVideos = data.results.filter((v: any) => v.type === 'Trailer');
      setVideos(trailerVideos.length > 0 ? trailerVideos : data.results);
      console.log('비디오', data.results);
    };

    onFetchID();
    onFetchAge();
    onFetchLogo();
    onFetchVideo();
  }, [id, type]); // type이 바뀔 때도 감지하도록 추가

  const firstDate = player.first_air_date || player.release_date;
  const year = firstDate ? firstDate.split('-')[0] : '';
  console.log(year, id, type, player, player.episode_run_time);
  const [activeTab, setActiveTab] = useState('추천 콘텐츠');
  const tabList = ['추천 콘텐츠', '작품정보', '예고편', '컬렉션'];

  // TODO 재생 목록 파이어베이스 저장
  const handleVideoOpen = async () => {
    console.log('클릭 이벤트 실행');
    try {
      if (!id || !type) {
        return;
      }

      //
      if (!player.poster_path) {
        console.error('poster_path가 없습니다');
        return;
      }

      const watchingItem: any = {
        id: Number(id),
        poster_path: player.poster_path,
        backdrop_path: player.backdrop_path || '',
        currentTime: 0,
        duration: 0,
      };
      // 영화면 title, TV면 name 추가
      if (type === 'movie') {
        watchingItem.title = player.title;
      } else {
        watchingItem.name = player.name;
      }

      console.log('저장할 데이터:', watchingItem);
      await onAddWatching(watchingItem);
      console.log('Firebase 저장 완료');
      navgate(`/play/${type}/${id}/video`);

      // 저장 완료 후 아무 작업도 하지 않음 (페이지 그대로 유지)
    } catch (error) {
      console.error('저장 실패:', error);
      alert('저장에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleWishToggle = () => {
    const wishItem: any = {
      id: Number(id),
      poster_path: player.poster_path,
      backdrop_path: player.backdrop_path || '',
    };

    if (type === 'movie') {
      wishItem.title = player.title;
    } else {
      wishItem.name = player.name;
    }
    onToggleWish(wishItem);
  };

  return (
    <section className="VideoPlayer">
      <div className="playerMain">
        <img
          src={`https://image.tmdb.org/t/p/original/${
            player.backdrop_path ? player.backdrop_path : player.poster_path
          }`}
          alt={player.name || player.title}
        />
        <div className="info-wrap">
          <div className="logo">
            {logo ? (
              // 로고 이미지가 있을 때
              <img
                src={`https://image.tmdb.org/t/p/original/${logo}`}
                alt={player.title || player.name}
              />
            ) : (
              // 로고 이미지가 없을 때 텍스트 제목 출력
              <h1 className="logo-text">{player.title || player.name}</h1>
            )}
          </div>
          <div className="flex">
            <span className={`info1 age age${certification}`}></span>
            <div className="innerFlex">
              <span className="info2">{year}</span>
              <span className="info3">{player.episode_run_time}</span>
              <p className="info4">
                {player.genres &&
                  player.genres.map((genre: Genre) => <span key={genre.id}>{genre.name}</span>)}
              </p>
            </div>
          </div>

          <div className="bar">
            <div className="outBar">
              <div className="innerBar" style={{ width: '500px' }}></div>
            </div>
            <div className="Time">
              <span className="runTime">{player.episode_run_time}</span>
              <span className="look"></span>
            </div>
          </div>
          <div className="buttonWrap">
            <button
              className="play"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleVideoOpen();
              }}>
              지금 재생하기
            </button>
            <button className="MyWish LinkBtn" onClick={handleWishToggle}></button>
          </div>
        </div>
      </div>
      <div className="relatedInfo">
        <div className="buttonWrap">
          {tabList.map((el, i) => (
            <button
              key={i}
              className={activeTab === el ? 'active' : ''}
              onClick={() => setActiveTab(el)}>
              {el}
            </button>
          ))}
        </div>
        <div className="tab-content">
          {activeTab === '작품정보' && (
            <div className="detailData tab">
              <ul>
                <li className="title">줄거리</li>
                <li>{player.overview}</li>
              </ul>
              {player.production_companies && (
                <ul>
                  <li className="title">제작사</li>
                  <li>
                    {player.production_companies.map((el, i) => (
                      <span key={i} className="production">
                        {el.name} ,
                      </span>
                    ))}
                  </li>
                </ul>
              )}

              {player.networks && (
                <ul>
                  <li className="title">배급사</li>

                  <li>
                    {player.networks.map((el, i) => (
                      <span key={i}>{el.name}</span>
                    ))}
                  </li>
                </ul>
              )}

              {player.release_date && (
                <ul>
                  <li className="title">개봉 날짜</li>
                  <li>{player.release_date}</li>
                </ul>
              )}
            </div>
          )}
          {activeTab === '추천 콘텐츠' && (
            <div className="recommend tab">비슷한 영화/TV 시리즈 목록</div>
          )}
          {activeTab === '예고편' && (
            <div className="trailers tab">
              <h3>예고편</h3>
              <div className="videoWarp grid row">
                {videos && videos.length > 0 ? (
                  videos.slice(0, 2).map(
                    (
                      video // 상위 2개만 예시로 출력
                    ) => (
                      <div key={video.id} className="grid-item">
                        <iframe
                          src={`https://www.youtube.com/embed/${video.key}`}
                          title={video.name}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen></iframe>
                        <p>{video.name}</p>
                      </div>
                    )
                  )
                ) : (
                  <p className="info">등록된 예고편이 없습니다.</p>
                )}
              </div>
            </div>
          )}
          {activeTab === '컬렉션' && (
            <div className="collection tab">
              <h3>컬렉션</h3>
              {(player.seasons && player.seasons.length > 0) || player.belongs_to_collection ? (
                <ul className="collection-list grid col">
                  {/* TV 시즌 출력 */}
                  {player.seasons?.map((el) => (
                    <li key={el.id} className="collections grid-item ">
                      <Link to={`/play/${type}/${el.id}`}>
                        <img
                          src={`https://image.tmdb.org/t/p/w500/${el.poster_path}`}
                          alt={el.name}
                        />
                      </Link>
                    </li>
                  ))}

                  {/* 영화 컬렉션 출력 */}
                  {player.belongs_to_collection && (
                    <li className="collections">
                      <Link to={`/play/${type}/${player.belongs_to_collection.id}`}>
                        <img
                          src={`https://image.tmdb.org/t/p/w500/${player.belongs_to_collection.poster_path}`}
                          alt={player.belongs_to_collection.name}
                        />
                      </Link>
                    </li>
                  )}
                </ul>
              ) : (
                /* 2. 둘 다 없는 경우 */
                <p className="info">정보가 없습니다.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default VideoPlayer;
