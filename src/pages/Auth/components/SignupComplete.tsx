import { useNavigate } from 'react-router-dom';
import AuthTop from './AuthTop';
import '../scss/SignupComplete.scss';

const SignupComplete = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };
  return (
    <div className="signupCompleteWrap">
      <AuthTop title="회원가입이 완료되었습니다." />
      <button onClick={handleLogin}>로그인 하기</button>
    </div>
  );
};

export default SignupComplete;
