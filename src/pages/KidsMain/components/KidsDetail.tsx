import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useKidsMoiveStore } from '../../../store/useKidsMovieStore'
import "../scss/KidsDeatil.scss";
import { characterMovieData } from '../../../store/kidsMovieData';

const KidsDetail = () => {
    const { friends } = useParams<{ friends: string }>();
    const { kidsCharacterMovie, onFethCharacterMovie } = useKidsMoiveStore();
    const selected = characterMovieData.find((c) => c.id === friends)

    useEffect(() => {
        if (selected) {
            onFethCharacterMovie(selected)
        }
    }, [friends, selected])
    return (
        <div className="kidsDetailListWrap">
            <h2 className='title'>{selected.name}</h2>
            <ul className="kidsList">
                {kidsCharacterMovie.map((item) => (
                    <li className="kidsItem">
                        <Link to={`/play/${item.id}`}>
                            <div className="imgBox">
                                <img
                                    src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                                    alt={item.id}
                                />
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default KidsDetail