import '../assets/favorite.css'
import MovieItem from '../components/MovieItem';
import { useFavContext } from '../context/FavoriteContext'
import { useTheme } from '../context/ThemeContext';

const Favorites = () => {
  const { theme } = useTheme();
  const { favItems } = useFavContext();

  const displayContent = favItems?.map(item => {
    return <MovieItem key={item?.id} posterImg={item?.posterImg} title={item.name} score={item?.score} id={item?.id} type={item?.type}/>
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
