import { Link } from 'react-router-dom';
import { useWishStore } from '../../store/useWishStore';
import './scss/WishlistPage.scss';
import { useEffect } from 'react';
import { useProfileStore } from '../../store/useProfileStore';

const WishlistPage = () => {
  const { wishlist, onToggleWish, onFetchWish } = useWishStore();
  const { activeProfileId } = useProfileStore();

  useEffect(() => {
    onFetchWish();
  }, [activeProfileId]);
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
      <div className="pageTopWrap">
        <h2>내가 찜한 콘텐츠</h2>
        <div className="filterWrap">
          <div className="filterHeader">
            <ul className="filterList"></ul>
          </div>
        </div>
      </div>
      <div className="wishListWrap">
        <ul className="listWrap">
          {wishlist.map((wish) => (
            <li key={wish.id}>
              <Link to={`/play/${wish.type}/${wish.id}`}>
                <div className="imgBox">
                  <img
                    src={`http://image.tmdb.org/t/p/w300${wish.backdrop_path}`}
                    alt={wish.title || wish.name}
                  />
                </div>
              </Link>
              <button onClick={() => onToggleWish(wish)}></button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WishlistPage;
