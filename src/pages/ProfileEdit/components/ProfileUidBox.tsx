import React, { useState } from 'react';
import '../scss/ProfileUidBox.scss';
interface ProfileUidBoxProps {
  username: string;
  image?: string;
  onChangeName: (value: string) => void;
}

const ProfileUidBox = ({ username, image, onChangeName }: ProfileUidBoxProps) => {
  const [err, setErr] = useState('');

  const validateName = (value: string) => {
    const regex = /^[A-Za-z0-9가-힣]+$/;

    if (value.length > 6) return '6자 이하만 가능합니다.';
    if (value && !regex.test(value)) return '한글, 영문, 숫자만 사용할 수 있습니다.';
    return '';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setErr(validateName(value));
    onChangeName(value);
  };

  return (
    <div className="profileuidBox">
      <div className="left">
        <div className="uidInfo">
          <p>이름</p>
          <span
            className="fontSize14"
            style={{ fontSize: '1.4rem', fontWeight: '400', color: '#ddd', lineHeight: '150%' }}>
            한글, 영문(대소문자 구분), 숫자만 사용 가능하며 6자 이하이어야 합니다.
          </span>
        </div>
        <div className="unameInput">
          <input
            type="text"
            value={username}
            placeholder={username === '' ? '이름을 입력해주세요.' : ''}
            onChange={handleChange}
            className={err ? 'nameinputWrong' : 'nameinput'}
          />
          <span className="error">{err}</span>
        </div>
      </div>
      <div className="right">
        <div className="userPhoto">
          {image ? <img src={image} alt="프로필사진" /> : <div className="emptyPhoto" />}
        </div>
      </div>
    </div>
  );
};

export default ProfileUidBox;
