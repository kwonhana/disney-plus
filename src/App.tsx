import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './pages/Header/Header';
import MainPage from './pages/Main/MainPage';
import SubscriptionPage from './pages/Subscription/SubscriptionPage';
import PaymentPage from './pages/Subscription/PaymentPage';
import ProfileSettingPage from './pages/ProfileSetting/ProfileSettingPage';
import LoginPage from './pages/Auth/LoginPage';
import SignupPage from './pages/Auth/SignupPage';
import { useAuthStore } from './store/useAuthStore';
import { useEffect } from 'react';
import ProfileEditPage from './pages/ProfileEdit/ProfileEditPage';
import MainMovie from './pages/Main/MainMovie';


function App() {
  const { initAuth } = useAuthStore();

  useEffect(() => {
    initAuth(); // 앱 시작 시 로그인 상태 초기화
  }, [initAuth]);

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/movie" element={<MainMovie />} />
        <Route path="/subscription" element={<SubscriptionPage />} />
        <Route path="/profile/setting" element={<ProfileSettingPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/profile/edit" element={<ProfileEditPage />} />
      </Routes>
    </div>
  );
}

export default App;
