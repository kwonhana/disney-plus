// // import { Swiper, SwiperSlide } from 'swiper/react';
// // import 'swiper/swiper.css';
// // import { Pagination } from 'swiper/modules';
// // import { RecommendedForYouData } from '../../../store/data';
// // import '../scss/KidsMovieList.scss';
// // import { Link } from 'react-router-dom';
// // import HeaderTitle from '../../Main/components/HeaderTitle';

// // //TODO 사용자 맞춤 추천 목록
// // const RecommendedForYou = () => {

// //     return (
// //         <section className="RecommendedForYou movieList pullInner">
// //             <HeaderTitle mainTitle="@@@님이 좋아할 만한 이야기" />
// //             <>
// //                 <Swiper
// //                     slidesPerView={6.2}
// //                     spaceBetween={20}
// //                     pagination={{
// //                         clickable: true,
// //                     }}
// //                     modules={[Pagination]}
// //                     className="mySwiper">
// //                     {RecommendedForYouData
// //                         .map((el) => {
// //                             return (
// //                                 <SwiperSlide>
// //                                     <Link to="void">
// //                                         <div className="movieThumbnail col kids">
// //                                             <img
// //                                                 src={`https://image.tmdb.org/t/p/w500/${el.poster_path}`}
// //                                                 alt={`${el.title} 썸네일`}
// //                                             />
// //                                         </div>
// //                                     </Link>
// //                                 </SwiperSlide>
// //                             );
// //                         })}
// //                 </Swiper>
// //             </>
// //         </section>
// //     );
// // };

// // export default RecommendedForYou;

// import { useEffect, useRef, useState } from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/swiper.css';
// import { Pagination } from 'swiper/modules';
// import { Link } from 'react-router-dom';
// import HeaderTitle from '../../Main/components/HeaderTitle';
// import VideoPopup from '../../Main/components/VideoPopup';
// import { RecommendedForYouData } from '../../../store/data';
// import { useMovieStore } from '../../../store/useMovieStore';
// import { useTvStore } from '../../../store/useTvStore';
// import '../scss/KidsMovieList.scss';

// const RecommendedForYou = () => {
//   const { onFetchVideo } = useMovieStore();
//   const { onFetchTvVideo } = useTvStore();

//   const [hoveredId, setHoveredId] = useState<number | null>(null);
//   const [youtubeKey, setYoutubeKey] = useState('');
//   const [popupData, setPopupData] = useState<any>(null);
//   const [popupPos, setPopupPos] = useState({ top: 0, left: 0, width: 0 });

//   const containerRef = useRef<HTMLDivElement>(null);
//   const hoverTimer = useRef<NodeJS.Timeout | null>(null);

//   const handleMouseEnter = (e: React.MouseEvent, el: any) => {
//     if (hoverTimer.current) clearTimeout(hoverTimer.current);

//     const rect = e.currentTarget.getBoundingClientRect();
//     const containerRect = containerRef.current?.getBoundingClientRect();
//     const windowWidth = window.innerWidth;

//     let leftPos = rect.left - (containerRect?.left || 0);
//     const popupWidth = rect.width * 1.2;

//     if (rect.left + popupWidth > windowWidth - 20) {
//       leftPos = leftPos - (popupWidth - rect.width);
//     }

//     const position = {
//       top: rect.top - (containerRect?.top || 0),
//       left: leftPos,
//       width: rect.width,
//     };

//     hoverTimer.current = setTimeout(async () => {
//       setPopupData(el);
//       setPopupPos(position);
//       setHoveredId(el.id);

//       try {
//         let videos;
//         if (el.media_type === 'tv') {
//           videos = await onFetchTvVideo(String(el.id));
//         } else {
//           videos = await onFetchVideo(el.id);
//         }

//         if (videos && videos.length > 0) {
//           const trailer =
//             videos.find(
//               (v: any) => (v.type === 'Trailer' || v.type === 'Teaser') && v.site === 'YouTube'
//             ) || videos.find((v: any) => v.site === 'YouTube');
//           setYoutubeKey(trailer ? trailer.key : '');
//         }
//       } catch (error) {
//         console.error('비디오 로드 실패:', error);
//       }
//     }, 400);
//   };

//   const handleMouseLeave = () => {
//     if (hoverTimer.current) clearTimeout(hoverTimer.current);
//     setHoveredId(null);
//   };

//   // 데이터가 없을 때 섹션 자체를 숨기지 않고 메시지를 띄워 확인해봅니다.
//   if (!RecommendedForYouData || RecommendedForYouData.length === 0) {
//     return null;
//   }

//   return (
//     <section
//       className="RecommendedForYou movieList pullInner"
//       ref={containerRef}
//       style={{ position: 'relative', minHeight: '300px' }} // 최소 높이 부여
//     >
//       <HeaderTitle mainTitle="우리 아이가 좋아할 만한 이야기" />

//       <Swiper
//         slidesPerView={6.2}
//         spaceBetween={20}
//         pagination={{ clickable: true }}
//         modules={[Pagination]}
//         className="mySwiper"
//         style={{ overflow: 'visible' }}>
//         {RecommendedForYouData.map((el, idx) => (
//           <SwiperSlide key={`${el.id}-${idx}`}>
//             <Link
//               to={`/play/${el.media_type === 'tv' ? 'tv' : 'movie'}/${el.id}`}
//               onMouseEnter={(e) => handleMouseEnter(e, el)}
//               onMouseLeave={() => {
//                 if (hoverTimer.current) clearTimeout(hoverTimer.current);
//               }}>
//               <div className="movieThumbnail col kids">
//                 <div className="imgBox">
//                   <img
//                     src={`https://image.tmdb.org/t/p/w500/${el.poster_path}`}
//                     alt="썸네일"
//                     style={{ width: '100%', display: 'block' }} // 이미지 강제 출력
//                   />
//                 </div>
//               </div>
//             </Link>
//           </SwiperSlide>
//         ))}
//       </Swiper>

//       {hoveredId && popupData && (
//         <div
//           className="external-popup-portal"
//           onMouseLeave={handleMouseLeave}
//           style={{
//             position: 'absolute',
//             top: popupPos.top - 15,
//             left: popupPos.left - popupPos.width * 0.1,
//             width: popupPos.width * 1.2,
//             zIndex: 9999,
//             pointerEvents: 'auto',
//           }}>
//           <VideoPopup
//             youtubeKey={youtubeKey}
//             title={popupData.title || popupData.name}
//             id={popupData.id}
//             mediaType={popupData.media_type === 'tv' ? 'tv' : 'movie'}
//             posterPath={popupData.poster_path || ''}
//             backdropPath={popupData.backdrop_path}
//             onClose={handleMouseLeave}
//           />
//         </div>
//       )}
//     </section>
//   );
// };

// export default RecommendedForYou;

import { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.css';
import { Pagination } from 'swiper/modules';
import { Link, useMatch } from 'react-router-dom'; // useMatch 추가
import HeaderTitle from '../../Main/components/HeaderTitle';
import VideoPopup from '../../Main/components/VideoPopup';
import { useMovieStore } from '../../../store/useMovieStore';
import { useTvStore } from '../../../store/useTvStore';
import { useRecommendationStore } from '../../../store/useRecommendationStore';
import { useProfileStore } from '../../../store/useProfileStore';
import '../scss/KidsMovieList.scss';

const RecommendedForYou = () => {
  const { onFetchVideo } = useMovieStore();
  const { onFetchTvVideo } = useTvStore();
  const { recommendedItems, isLoading, onGenerateRecommendations } = useRecommendationStore();
  const { activeProfile } = useProfileStore();

  // 1. 현재 키즈 경로(/kids/*)에 있는지 확인
  const isKidsPath = useMatch('/kids/*');

  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [youtubeKey, setYoutubeKey] = useState('');
  const [popupData, setPopupData] = useState<any>(null);
  const [popupPos, setPopupPos] = useState({ top: 0, left: 0, width: 0 });

  const containerRef = useRef<HTMLDivElement>(null);
  const hoverTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    onGenerateRecommendations();
  }, [onGenerateRecommendations]);

  // 2. 키즈 모드일 경우 성인 등급이나 부적절한 장르를 제외하는 필터링 로직 추가
  // (store 자체를 수정하기 어려울 때 컴포넌트 단에서 1차 필터링)
  const displayItems = isKidsPath
    ? recommendedItems.filter((item: any) => {
        // 장르 ID 기반 필터 (예: 10751: 가족, 16: 애니메이션)
        // 또는 item.adult === false 인 것만 추출
        return !item.adult && (item.genre_ids?.includes(10751) || item.genre_ids?.includes(16));
      })
    : recommendedItems;

  const handleMouseEnter = (e: React.MouseEvent, el: any) => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);

    const rect = e.currentTarget.getBoundingClientRect();
    const containerRect = containerRef.current?.getBoundingClientRect();
    const windowWidth = window.innerWidth;

    let leftPos = rect.left - (containerRect?.left || 0);
    const popupWidth = rect.width * 1.2;

    if (rect.left + popupWidth > windowWidth - 20) {
      leftPos = leftPos - (popupWidth - rect.width);
    }

    const position = {
      top: rect.top - (containerRect?.top || 0),
      left: leftPos,
      width: rect.width,
    };

    hoverTimer.current = setTimeout(async () => {
      setPopupData(el);
      setPopupPos(position);
      setHoveredId(el.id);

      try {
        let videos;
        if (el.media_type === 'tv') {
          videos = await onFetchTvVideo(String(el.id));
        } else {
          videos = await onFetchVideo(el.id);
        }

        if (videos && videos.length > 0) {
          const trailer =
            videos.find(
              (v: any) => (v.type === 'Trailer' || v.type === 'Teaser') && v.site === 'YouTube'
            ) || videos.find((v: any) => v.site === 'YouTube');
          setYoutubeKey(trailer ? trailer.key : '');
        }
      } catch (error) {
        setYoutubeKey('');
      }
    }, 400);
  };

  const handleMouseLeave = () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    setHoveredId(null);
  };

  if (isLoading) return null;
  if (displayItems.length === 0) return null;

  return (
    <section
      className="RecommendedForYou movieList pullInner"
      ref={containerRef}
      style={{ position: 'relative' }}>
      <HeaderTitle mainTitle={`${activeProfile?.name || '우리 아이'}를 위한 추천 이야기`} />

      <Swiper
        slidesPerView={6.2}
        spaceBetween={20}
        pagination={{ clickable: true }}
        modules={[Pagination]}
        className="mySwiper"
        style={{ overflow: 'visible' }}>
        {displayItems.map((el, idx) => (
          <SwiperSlide key={`${el.media_type}-${el.id}-${idx}`}>
            <Link
              to={`/play/${el.media_type}/${el.id}`}
              onMouseEnter={(e) => handleMouseEnter(e, el)}
              onMouseLeave={() => {
                if (hoverTimer.current) clearTimeout(hoverTimer.current);
              }}>
              <div className={`movieThumbnail col ${isKidsPath ? 'kids' : ''}`}>
                <div className="imgBox">
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${el.poster_path}`}
                    alt={el.title || el.name}
                  />
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      {hoveredId && popupData && (
        <div
          className="external-popup-portal"
          onMouseLeave={handleMouseLeave}
          style={{
            position: 'absolute',
            top: popupPos.top - 15,
            left: popupPos.left - popupPos.width * 0.1,
            width: popupPos.width * 1.2,
            zIndex: 1000,
          }}>
          <VideoPopup
            youtubeKey={youtubeKey}
            title={popupData.title || popupData.name}
            id={popupData.id}
            mediaType={popupData.media_type}
            posterPath={popupData.poster_path || ''}
            backdropPath={popupData.backdrop_path}
            onClose={handleMouseLeave}
          />
        </div>
      )}
    </section>
  );
};

export default RecommendedForYou;
