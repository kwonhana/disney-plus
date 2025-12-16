import React from 'react';
import ProfileTitle from '../../ProfileSetting/components/ProfileTitle';
import { useProfileStore, type Profile } from '../../../store/useProfileStore';
import '../scss/ProfileSelectPage.scss';
import { Link, useNavigate } from 'react-router-dom';

interface Props {
  onClose: () => void;
}

const ProfileSelectEdit = ({ onClose }: Props) => {
  const { profiles, selectProfile } = useProfileStore();

  const navigate = useNavigate();

  const handleProfileEdit = (profile: Profile) => {
    selectProfile(profile)
    navigate('/profile/edit')
  };

  return (
    <>
      <ProfileTitle profileTitle="프로필 수정" />

      <div className="profileSelect">
        <div className="profiles editMode">
          {profiles.map((profile) => (
            <div className="profile" key={profile.id}
            onClick={() => handleProfileEdit(profile)}>
              <div className="profileImgBox">
                <img src={profile.image} alt={profile.name} />
              </div>
              <div className="profileTextBox">
                <span>{profile.name}</span>
              </div>
            </div>
          ))}

          <div className="editcompleteBtnWrap">
            <button className="editcompleteBtn" onClick={onClose}>
              완료
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileSelectEdit;
