import React, { useEffect, useState } from 'react';
import ProfileTitle from '../ProfileSetting/components/ProfileTitle';
import { useProfileStore, type Profile } from '../../store/useProfileStore';
import './scss/ProfileSelectPage.scss';
import { Link } from 'react-router-dom';
import ProfileSelectEdit from './components/ProfileSelectEdit';

const ProfileSelectPage = () => {
  const { profiles, initDefaultProfiles, selectProfile } = useProfileStore();

  const [mode, setMode] = useState<'select' | 'edit'>('select');

  useEffect(() => {
    initDefaultProfiles();
  }, []);

  const handleEditMode = () => {
    setMode('edit');
  };
  const handleSelectEdit = (profile: Profile) => {
    selectProfile(profile);
  };

  return (
    <div className="profileSelectBg pullInner">
      <div className="profileSelectWrap inner">
        {mode === 'select' && (
          <>
            <ProfileTitle profileTitle="감상할 프로필 선택하기" />

            <div className="profileSelect">
              <div className="profiles">
                {profiles.map((profile) => (
                  <div
                    className="profile"
                    key={profile.id}
                    onClick={() => handleSelectEdit(profile)}>
                    <Link to="/void" className="profileImgBox">
                      <img src={profile.image} alt={profile.name} />
                    </Link>
                    <div className="profileTextBox">
                      <span>{profile.name}</span>
                    </div>
                  </div>
                ))}
                <div className="addNewProfile">
                  <div className="addProfileImgBox">
                    <Link to="/profile/create/image">
                      <img src="/icon/plusIcon.svg" alt="계정 추가 아이콘" />
                    </Link>
                  </div>
                  <div className="addProfileTextBox">
                    <span>프로필 추가</span>
                  </div>
                </div>
              </div>

              <div className="profileEditBtnWrap">
                <button className="profileEditBtn" onClick={handleEditMode}>
                  프로필 수정
                </button>
              </div>
            </div>
          </>
        )}

        {mode === 'edit' && <ProfileSelectEdit onClose={() => setMode('select')} />}
      </div>
    </div>
  );
};

export default ProfileSelectPage;
