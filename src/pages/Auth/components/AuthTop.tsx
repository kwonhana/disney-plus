// 로그인, 회원가입 top 컴포넌트

const AuthTop = ({ title, authText }: { title: string; authText: string }) => {
  return (
    <div className="authTop">
      <div className="authLogo">
        <img src="/images/auth/myDisney.svg" alt="auth_logo" />
      </div>
      <h2 className="authTitle" dangerouslySetInnerHTML={{ __html: title }} />
      <p className="authText" dangerouslySetInnerHTML={{ __html: authText }} />
    </div>
  );
};

export default AuthTop;
