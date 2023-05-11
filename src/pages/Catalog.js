import { useEffect, useState } from 'react'
import '../assets/searchPage.css'
import apiConfig from '../apiConfig'
import MovieItem from '../components/MovieItem';
import useFetchData from '../hooks/useFetchData';
import { useParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { useTheme } from '../context/ThemeContext'

const Catalog = () => {
    const {typeOf: isMovie} = useParams();
    const [page, setPage] = useState(1);
    const [type, setType] = useState('popularity.desc')
    const [category, setCategory] = useState('')
    const {data, error, loading} = useFetchData(`${apiConfig.baseUrl}discover/${isMovie}?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=${type}&with_genres=${category}&vote_count.gte=200&api_key=${apiConfig.apiKey}`);
    const {data: categories} = useFetchData(`${apiConfig.baseUrl}genre/movie/list?language=en&api_key=${apiConfig.apiKey}`)
    const { theme } = useTheme();

    useEffect(() => {
      setPage(1)
      setType('popularity.desc')
      setCategory('')
    }, [isMovie])

    const displayContent = data?.results?.map((item => {
        let title = item?.title
        if(title === undefined) title = item?.name
        return <MovieItem key={item?.id} posterImg={item?.poster_path} title={title} score={item?.vote_average} id={item?.id} type={isMovie}/>
    }));

    const handlePage = (pageNum) => {
      setPage(() => {
          const newPage = page + pageNum;
          if (newPage === data.total_pages + 1) return 1;
          if(newPage < 1) return 1;
          return newPage;
      })
    };

    const handleChangeType = (newType) => {
        setType(newType);
        setCategory('')
        setPage(1);
    };

    const handleChangeCategory = (newCategory) => {
      setCategory(newCategory);
      setPage(1);
  };

  const displayCategories = categories?.genres?.map(cat => {
    return <li key={cat.id} onClick={() => handleChangeCategory(cat.id)} className={category === cat.id ? 'active' : ''}>{cat.name}</li>
  })

  return (
    <div className={`search-page ${theme}`}>
        <header>
          <h6>{isMovie === 'tv' ? 'TV Shows' : 'Movies'}</h6>
            <ul>
                <li className={type === 'popularity.desc' ? 'active' : ''} onClick={() => handleChangeType('popularity.desc')}>Popular</li>
                <li className={type === 'vote_average.desc' ? 'active' : ''} onClick={() => handleChangeType('vote_average.desc')}>Top Rated</li>
                <li className={type === 'revenue.desc' ? 'active' : ''} onClick={() => handleChangeType('revenue.desc')}>Revenue</li>
            </ul>
        </header>
        <section className='categories-container'>
            <ul className='categories-bar'>
                {displayCategories}
            </ul>
        </section>
        <main className='search-page-content'>
            <section className='search-content'>
                {loading ? <ClipLoader color="#D4ADFC" /> : displayContent}
                {error ? <div>{error.message}</div> : null}
                {data?.results?.length < 1 ? <div className='no-results'>No results</div> : null}
            </section>
        </main>
        <div className='pagination'>
            {page === 1 ? null : <button onClick={() => handlePage(-1)}>Prev</button>}
            <h6>Page {page}</h6>
            <button onClick={() =>  handlePage(1)}>Next</button>
        </div>
    </div>
  )
}

export default Catalog
