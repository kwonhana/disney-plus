import React, { useState } from 'react';
import ProfileSettingBox from '../../ProfileSetting/components/ProfileSettingBox';
import ProfileUidBox from './ProfileUidBox';
import '../scss/ProfileEditBox.scss';
import AgeSettingPopup from './AgeSettingPopup';

const ProfileEditBox = () => {
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  return (
    <>
      <div className="profileEditBoxWrap">
        <div className="profileEditBoxTop">
          <ProfileUidBox userPhoto="아직 없음" uName="authstore에서 유저 이름 가져오기" />
        </div>
        <div className="profileEditBoxBottom">
          <ProfileSettingBox title="시청 제한 설정">
            <div className="profileBoxContent">
              <div className="ageSetting top">
                <span className="SubTitle">콘텐츠 등급 설정</span>
                <button className="ageSettingBtn" onClick={openPopup}></button>
              </div>
              <div className="ageSetting bottom">
                <span>15세 이상 </span>
                {/* 등급 설정 모달에서 값 받아오기 */}
                <span>등급 콘텐츠까지 시청할 수 있습니다.</span>
              </div>
            </div>
          </ProfileSettingBox>
        </div>
      </div>

      {isPopupOpen && <AgeSettingPopup onClose={closePopup} />}
    </>
  );
};

export default ProfileEditBox;
