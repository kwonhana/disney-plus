import React from 'react';
import ProfileTitle from '../ProfileSetting/components/ProfileTitle';
import './scss/ProfileEditPage.scss';
import ProfileEditBox from './components/ProfileEditBox';
import { Link } from 'react-router-dom';

const ProfileEditPage = () => {
  return (
    <div className="profileEditBg pullInner">
      <div className="profileEditWrap inner">
        <ProfileTitle profileTitle="프로필 수정" />
        <ProfileEditBox />
        <div className="profileEditBtnwrap">
          <Link to="/void" className="profileEditBtn">
            <button>완료</button>
          </Link>
          <button className="pofileDelBtn">프로필 삭제</button>
        </div>
      </div>
    </div>
  );
};

export default ProfileEditPage;
