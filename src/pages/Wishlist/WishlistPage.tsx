import { Link } from 'react-router-dom';
import { useWishStore } from '../../store/useWishStore';
import './scss/WishlistPage.scss';
import { useEffect } from 'react';
import { useProfileStore } from '../../store/useProfileStore';

const WishlistPage = () => {
  const { wishlist, onToggleWish, onFetchWish } = useWishStore();
  const { activeProfileId } = useProfileStore();

  // 프로필이 변경될 때마다 찜 목록을 새로 가져옵니다.
  useEffect(() => {
    if (activeProfileId) {
      onFetchWish();
    }
  }, [activeProfileId, onFetchWish]);

  // 찜 목록이 비어있을 때의 렌더링
  if (wishlist.length === 0) {
    return (
      <div className="wishlistPage normal">
        <div className="pageTopWrap">
          <h2>내가 찜한 콘텐츠</h2>
        </div>
        <p className="emptyMessage">찜한 콘텐츠가 없습니다. 취향에 맞는 콘텐츠를 담아주세요.</p>
      </div>
    );
  }

  return (
    <div className="wishlistPage normal">
      <div className="inner">
        <div className="wishWrap">
          <div className="pageTopWrap">
            <h2>내가 찜한 콘텐츠</h2>
          </div>

          <div className="wishListWrap">
            <ul className="listWrap">
              {wishlist.map((wish) => (
                // media_type('movie'|'tv')과 id 조합으로 고유 키 설정
                <li key={`${wish.media_type}-${wish.id}`} className="wishItem">
                  <Link to={`/play/${wish.media_type}/${wish.id}`}>
                    <div className="imgBox">
                      <img
                        src={
                          wish.poster_path
                            ? `https://image.tmdb.org/t/p/w500${wish.poster_path}`
                            : '/assets/no-image.png' // 포스터 누락 대비
                        }
                        alt={wish.title}
                      />
                    </div>
                  </Link>

                  <div className="hoverWrap">
                    <div className="hoverBg">
                      <ul className="wishTab">
                        {/* 1. 바로 재생 버튼 */}
                        <li>
                          <Link to={`/play/${wish.media_type}/${wish.id}`}>
                            <button title="재생">
                              <img src="/icon/playIcon.svg" alt="재생" />
                            </button>
                          </Link>
                        </li>

                        {/* 2. 찜 목록에서 제거 (쓰레기통 아이콘) */}
                        <li>
                          <button onClick={() => onToggleWish(wish)} title="찜 목록에서 제거">
                            <img src="/icon/trashIcon.svg" alt="제거" />
                          </button>
                        </li>

                        {/* 3. 상세 정보 페이지 이동 */}
                        <li>
                          <Link to={`/play/${wish.media_type}/${wish.id}`}>
                            <button title="상세 정보">
                              <img src="/icon/hamIcon.svg" alt="상세 정보" />
                            </button>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;
