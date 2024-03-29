import '../assets/favorite.css'
import MovieItem from '../components/MovieItem';
import { useFavContext } from '../context/FavoriteContext'
import { useTheme } from '../context/ThemeContext';

const Favorites = () => {
  const { theme } = useTheme();
  const { favItems } = useFavContext();

  const displayContent = favItems?.map(item => {
    return <MovieItem key={item?.id} posterImg={item?.data.posterImg} title={item.data.title} score={item?.data.score} id={item?.data.movieId} type={item?.data.type}/>
  })

  return (
    <div className={`favorite-page ${theme}`}>
        <header>
            <h6>My List</h6>
        </header>
        <main className='favorite-page-content'>
            <section className='favorite-list'>
              <ul>
                {displayContent}
              </ul>
            </section>
        </main>
    </div>
  )
}

export default Favorites
