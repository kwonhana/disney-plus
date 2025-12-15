//TODO 메인 영화 import React from 'react'
import './scss/MainPage.scss';
import MainScreen from "./components/MainScreen"
import RecommendedForYou from "./components/RecommendedForYou"
import WatchList from "./components/WatchList"
import GenreList from './components/GenreList';

//TODO 메인 영화
const MainMovie = () => {
  return (
    <section className="MainPage movie normal">
      <MainScreen />
      <WatchList />
      <RecommendedForYou />
      <GenreList genreId="28" title="액션" />
    </section>
  )
}

export default MainMovie
