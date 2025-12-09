import React from 'react';
import MainScreen from './components/MainScreen';
import WatchList from './components/WatchList';
import './scss/MainPage.scss';
import RecommendedForYou from './components/RecommendedForYou';

const MainPage = () => {
  return (
    <section className="MainPage normal">
      <MainScreen />
      <WatchList />
      <RecommendedForYou />
    </section>
  );
};

export default MainPage;
