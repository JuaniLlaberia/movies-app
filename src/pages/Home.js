import Header from '../components/Header'
import '../assets/homepage.css'
import TrendingList from '../components/TrendingList'
import { useFavContext } from '../context/FavoriteContext'
import MovieItem from '../components/MovieItem'
import FavoriteList from '../components/FavoriteList'
import { useTheme } from '../context/ThemeContext'

const Home = ({setQuery}) => {
  const { favItems } = useFavContext();
  const { theme } = useTheme();

  const favoritesToRender = favItems?.map(item => {
      return <MovieItem key={item?.id} posterImg={item?.posterImg} title={item?.name} score={item?.score} id={item?.id} type={item?.type}/>
  })

  return (
    <>
      <main className={`${theme}`}>
          <Header setQuery={setQuery}/>
          <TrendingList urlSection='trending/all/day?language=en-US' title="Today's Trending"/>
          <TrendingList urlSection='trending/all/week?language=en-US' title="Weekly Trending"/>
          {favItems.length >= 1 ?
          <FavoriteList title='My List' list={favoritesToRender} linkTo='favorites'/>
          : null}
      </main>
    </>
  )
}

export default Home
