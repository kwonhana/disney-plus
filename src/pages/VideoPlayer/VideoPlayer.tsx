import './scss/VideoPlayerPage.scss';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import type { TV, Genre, DATA } from '../../types/ITV';
import { useWatchingStore } from '../../store/useWatchingStore';
import { useWishStore } from '../../store/useWishStore';

const VideoPlayer = () => {
  const [player, setPlayer] = useState<DATA>([]);
  const [logo, setLogo] = useState();
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
    // 1. 상세 데이터 호출 함수
    const onFetchID = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/${type}/${id}?api_key=${API_KEY}&language=ko-KR`
      );
      const data = await res.json();
      setPlayer(data);
    };
    // 2. 등급 데이터 호출 함수 (TV/Movie 대응)
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

    const onFetchLogo = async () => {
      const resLogo = await fetch(
        `https://api.themoviedb.org/3/${type}/${id}/images?api_key=${API_KEY}`
      );
      const dataLogo = await resLogo.json();
      const logoImg = dataLogo.logos?.[0]?.file_path || null;
      setLogo(logoImg);
    };
    console.log('logo', logo);

    onFetchID();
    onFetchAge();
    onFetchLogo();
  }, [id, type]); // type이 바뀔 때도 감지하도록 추가

  const firstDate = player.first_air_date || player.release_date;
  const year = firstDate ? firstDate.split('-')[0] : '';
  console.log(year);

  console.log(id, type, player, player.episode_run_time);

  // 재생하기 이벤트
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
      navgate(`/play/${watchingItem.type}/${watchingItem.id}/video`);

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
        <img src={`https://image.tmdb.org/t/p/original/${player.backdrop_path}`} alt="" />
        <div className="info-wrap">
          <div className="logo">
            <img src={`https://image.tmdb.org/t/p/original/${logo}`} alt="" />
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
          {/* <div className="infoTitle">{player.overview}</div> */}
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
          <button>상세정보</button>
          <button>추천 콘텐츠</button>
          <button>예고편</button>
          <button>컬렉션</button>
        </div>
      </div>
    </section>
  );
};

export default VideoPlayer;
