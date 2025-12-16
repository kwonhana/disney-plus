import React, { useEffect, useState } from 'react';
import ProfileTitle from '../ProfileSetting/components/ProfileTitle';
import ProfileEditBox from '../ProfileEdit/components/ProfileEditBox';
import { Link, useLocation } from 'react-router-dom';
import './scss/ProfileCreatePageInfo.scss';
import { useProfileStore } from '../../store/useProfileStore';

const ProfileCreatePageInfo = () => {
  const { addProfile, currentProfile, initCurrentProfile } = useProfileStore();

  useEffect(() => {
    if (!currentProfile) {
      initCurrentProfile();
    }
  }, [currentProfile, initCurrentProfile]);

  const location = useLocation();
  const [name, setName] = useState('');
  const [defaultContetLimit, setDefaultContentLimit] = useState(19);

  const handleCreateProfile = () => {
    addProfile({});
  };

  return (
    <div className="profileCreateBg pullInner">
      <div className="profileCreateWrap inner">
        <ProfileTitle profileTitle="프로필 생성" />
        <ProfileEditBox />
        <div className="profileCreateBtnWrap">
          <Link to="/profile/select" className="profileCreateBtn">
            <button>완료</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileCreatePageInfo;
