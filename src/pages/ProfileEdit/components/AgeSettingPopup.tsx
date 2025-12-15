import React, { useEffect } from 'react';
import '../scss/AgeSettingPopup.scss';

interface AgeSettingPopupProps {
  onClose: () => void;
}

const ageLevels = [
  { label: 'ALL', value: 0 },
  { label: '5세 이상', value: 5 },
  { label: '7세 이상', value: 7 },
  { label: '12세 이상', value: 12 },
  { label: '15세 이상', value: 15 },
  { label: '19세 이상', value: 19 },
];

const AgeSettingPopup = ({ onClose }: AgeSettingPopupProps) => {
  // const [selectedAge, setSelectedAge] = useState();

  const handleSaveAge = () => {};

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className="agesetPopupWrap">
      <div className="agesetPopup" onClick={(e) => e.stopPropagation}>
        <div className="agesetPopupTop">
          <div className="ageSetTitle">
            <p>콘텐츠 등급 설정</p>
          </div>
          <span>
            콘텐츠 등급을 변경해 프로필에서 어떤 콘텐츠의 스트리밍을 허용할지 관리할 수 있습니다.
            선택된 콘텐츠 등급을 초과하는 작품은 콘텐츠 둘러보기 시 화면에 표시되지 않습니다.
          </span>
        </div>
        <div className="ageProgressBar">
          <div
            className="ageProgressFill"
            // style={{
            //   width: `${
            //     (ageLevels.findIndex((a) => a.value === selectedAge) / (ageLevels.length - 1)) * 100
            //   }%`,
            // }}
          />

          {ageLevels.map((age, i) => {
            // const isActive = age.value <= selectedAge;

            return (
              <button
                key={age.value}
                // className={`ageDot ${isActive ? 'active' : ''}`}
                style={{ left: `${(i / (ageLevels.length - 1)) * 100}%` }}
                // onClick={() => setSelectedAge(age.value)}>
              >
                <span>{age.label}</span>
              </button>
            );
          })}
        </div>
        <div className="agesetPopupBtnWrap">
          <button className="ageSave" onClick={handleSaveAge}>
            저장
          </button>
          <button className="ageDel" onClick={onClose}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgeSettingPopup;
