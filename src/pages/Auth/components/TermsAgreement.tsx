// TODO 이용 약관 컴포넌트

const TermsAgreement = () => {
  return (
    <div className="checkboxWrap">
      <label>
        <input type="checkbox" className="checkboxInput" />
        <span className="checkboxCustom"></span>
        디즈니 + 및 Walt Disney Family of Companies에서 보내는 최신 소식, 특별 프로모션 및 기타
        정보를 받아 보고 싶습니다.(선택)
      </label>
      <label>
        <input type="checkbox" className="checkboxInput" required />
        <span className="checkboxCustom"></span>
        본인은 만 19세 이상이며 디즈니 + 이용약관과 MyDisney 계정 관련 디즈니 이용 약관에
        동의합니다.
      </label>
      <label>
        <input type="checkbox" className="checkboxInput" required />
        <span className="checkboxCustom"></span>
        개인정보 수집 및 이용에 동의합니다.
      </label>
      <label>
        <input type="checkbox" className="checkboxInput" required />
        <span className="checkboxCustom"></span>
        개인정보의 제3자 제공 및 국외 이전에 동의합니다.
      </label>
    </div>
  );
};

export default TermsAgreement;
