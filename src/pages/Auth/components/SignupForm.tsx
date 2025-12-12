// 회원가입 폼 컴포넌트

import { useState } from 'react';
import TermsAgreement from './TermsAgreement';
import { useAuthStore } from '../../../store/useAuthStore';
import MyDisney from './MyDisney';
import KidsMode from './KidsMode';

// props type 선언
interface SignupProps {
  onComplete: () => void;
}

const SignupForm = ({ onComplete }: SignupProps) => {
  const { onMember } = useAuthStore();

  // 상태 관리
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // TODO 아이디 상태 체크
  // const [emailStatus, setEmailStatus] = useState();
  // const [idMsg, setIdMsg] = useState('');

  // TODO 비밀번호 강도 상태 체크
  const [pwStrength, setPwStrength] = useState(0);
  const [pwLabel, setPwLabel] = useState('');
  // const [pwColor, setPwColor] = useState('');

  // TODO 아이디 유효성
  const validateID = (id: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // 정규식 테스트 후 true/false 반환
    return emailRegex.test(id);
  };

  // TODO 비밀번호 유효성
  const validatePW = (pwd: string) => {
    // 문자
    const pwLetter = /[a-zA-Z]/.test(pwd);
    // 숫자
    const pwNumber = /[0-9]/.test(pwd);
    // 특수문자
    const pwSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(pwd);
    // 공백 포함 금지
    const noSpace = !/\s/.test(pwd);

    // TODO .test(pwd) 자체가 정규식이 통과하면 true, 실패하면 false를 반환
    const typeCount = [pwLetter, pwNumber, pwSpecial].filter(Boolean).length;
    const pwLengthValid = pwd.length >= 8 && pwd.length <= 16;

    return typeCount >= 2 && pwLengthValid && noSpace;
  };

  // TODO 비밀번호 확인 검사

  // 폼 유효성 검사
  const validateForm = () => {
    if (!email) {
      alert('이메일을 입력해주세요.');
      return false;
    }

    if (!validateID(email)) {
      alert('이메일 형식이 올바르지 않습니다.');
      return false;
    }

    if (!password) {
      alert('비밀번호를 입력해주세요.');
      return false;
    }
    if (!validatePW(password)) {
      alert('비밀번호 형식이 올바르지 않습니다.');
      return false;
    }

    return true;
  };

  // 비밀번호 강도 계산하기
  const handlePasswordChange = (pwd: string) => {
    setPassword(pwd);

    let score = 0;

    if (pwd.length >= 8) score++;
    if (/[a-zA-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(pwd)) score++;

    setPwStrength(score);

    if (score <= 1) {
      setPwLabel('위험');
    } else if (score === 2) {
      setPwLabel('약함');
    } else if (score === 3) {
      setPwLabel('보통');
    } else if (score === 4) {
      setPwLabel('강력');
    }
  };

  // 회원가입 메서드
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await onMember(email, password);
      setEmail('');
      setPassword('');
      onComplete();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="signupFormWrap">
      <form className="signupForm" onSubmit={handleSignup}>
        <div className="idPwWrap">
          <div className="idWrap">
            <label>
              이메일
              <input
                type="email"
                placeholder="이메일을 입력해주세요"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
          </div>
          {/* TODO 비밀번호 / 정규식 이용하기 */}
          <div className="pwWrap">
            <label>
              비밀번호
              <input
                type="password"
                placeholder="비밀번호를 입력해주세요"
                required
                value={password}
                onChange={(e) => handlePasswordChange(e.target.value)}
              />
            </label>
            <p className="pwDec">
              비밀번호는 영문(대소문자 구분), 숫자, 특수문자를 포함해 8자 이상이어야 합니다.
            </p>
            {/* 비밀번호 progress bar */}
            <div className="progressBarWrap">
              <p className={`pwProgressBar strength${pwStrength}`}>
                <span className="pwColorBar"></span>
              </p>
              <span className="pwText">{pwLabel}</span>
            </div>
          </div>

          {/* 비밀번호 확인 */}
          <div className="confirmPwWrap">
            <label>
              비밀번호 확인
              <input type="password" placeholder="비밀번호를 입력해주세요" required />
            </label>
          </div>
        </div>
        {/* TODO 주니어 모드 설정 */}
        <KidsMode
          title="키즈모드 설정"
          subTitle="키즈 모드 이용 시 연령에 맞는 콘텐츠 제공을 위해 생년월일을 선택해주세요."
        />
        {/* TODO 회원가입 약관 */}
        <TermsAgreement />
        <p>
          '가입하기'를 누르면 위의 동의에 더하여 당신의 개인정보 처리방침과 개인 정보 처리방침
          부속서를 일독하였을 확인합니다.
        </p>
        <button className="signupBtn" type="submit">
          가입하기
        </button>
      </form>

      {/* my disney */}
      <MyDisney />
    </div>
  );
};

export default SignupForm;
