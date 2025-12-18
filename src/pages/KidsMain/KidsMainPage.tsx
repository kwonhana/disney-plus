import "./scss/KidsMainPage.scss"
import KidsMainScreen from './components/KidsMainScreen'
import KidsWatchingList from './components/KidsWatchingList'
import KidsRecommendedForYou from "./components/KidsRecommendedForYou"
import KidsFriendsSelect from "./components/KIdsFriendsSelect"
import KidsThemeList from "./components/KidsThemeList"
import GenreList from "../Main/components/GenreList"
import MainBanner from "../Main/components/MainBanner"
import Top10List from "../Main/components/Top10List"
import { useEffect } from "react"
import { useKidsMoiveStore } from "../../store/useKidsMovieStore"


const KidsMainPage = () => {
    const fetchCollctionMovie = useKidsMoiveStore((s) => s.fetchCollctionMovie)
    const { fetchLion } = useKidsMoiveStore();
    useEffect(() => {
        fetchCollctionMovie()
        fetchLion()
    }, [fetchCollctionMovie, fetchLion])
    return (
        <div className="KidsMainPage">
            <KidsMainScreen />
            <KidsWatchingList />
            <KidsFriendsSelect />
            <KidsRecommendedForYou />
            <KidsThemeList />
            <GenreList genreId="12" title="슈퍼파워 히어로" />
            {/* <MainBanner num={3} /> */}
            <Top10List title={"현재 인기 이야기 TOP 7"} />
            <GenreList genreId="10751" title="귀여운 동물 친구들" />
            <MainBanner num={0} />
            <GenreList genreId="14" title="또 다른 세계로" />
        </div>
    )
}

export default KidsMainPage