import Header from '../components/Header'
import '../assets/homepage.css'
import TrendingList from '../components/TrendingList'

const Home = ({setQuery}) => {
  return (
    <main>
        <Header setQuery={setQuery}/>
        <TrendingList urlSection='trending/all/day?language=en-US' title="Today's Trending"/>
        <TrendingList urlSection='trending/all/week?language=en-US' title="This Week Trending"/>
    </main>
  )
}

export default Home
