import { Link } from 'react-router-dom';
import './scss/BottomNav.scss';

const BottomNav = () => {
  return (
    <nav className="BottomNav">
      <ul>
        <li>
          <Link className="icon home" to="/"></Link>
        </li>
        <li>
          <Link className="icon heart" to="/"></Link>
        </li>
        <li>
          <Link className="icon search" to="/"></Link>
        </li>
        <li>
          <Link className="icon setting" to="/"></Link>
        </li>
        <li>
          <Link className="icon hamBtn" to=""></Link>
          <ul className="sub-nav">
            <li>
              <Link className="LinkBtn" to="/kids"></Link>
            </li>

            <li>
              <Link className="LinkBtn" to="/kids/movie">
                영화
              </Link>
            </li>

            <li>
              <Link className="LinkBtn" to="/kids/series">
                시리즈
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
};

export default BottomNav;
