import React, { useEffect } from 'react';
import ProfileTitle from '../ProfileSetting/components/ProfileTitle';
import './scss/ProfileEditPage.scss';
import ProfileEditBox from './components/ProfileEditBox';
import { useProfileStore } from '../../store/useProfileStore';
import { useNavigate } from 'react-router-dom';

const ProfileEditPage = () => {
  const { currentProfile, updateProfile } = useProfileStore();
  const navigate = useNavigate();

  if (!currentProfile) return null;

  return (
    <div className="profileEditBg pullInner">
      <div className="profileEditWrap inner">
        <ProfileTitle profileTitle="프로필 수정" />
        <ProfileEditBox />
        <div className="profileEditBtnwrap">
          <div className="profileEditBtn">
            <button
              onClick={() => {
                updateProfile(currentProfile.id, currentProfile);
                navigate('/profile/select');
              }}>
              완료
            </button>
          </div>
          <button className="pofileDelBtn">프로필 삭제</button>
        </div>
      </div>
    </div>
  );
};

export default ProfileEditPage;
