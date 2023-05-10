import { useEffect, useState } from 'react'
import '../assets/searchPage.css'
import apiConfig from '../apiConfig'
import MovieItem from '../components/MovieItem';

const Results = ({query}) => {
    const [page, setPage] = useState(1);
    const [type, setType] = useState('multi');
    const [content, setContent] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`${apiConfig.baseUrl}search/${type}?query=${query}&include_adult=false&language=en-US&page=${page}&api_key=${apiConfig.apiKey}`);
            const data = await response.json();
            setContent(data);
            console.log(data);
        }
        fetchData();
    },[query, page, type]);

    const displayContent = content.results?.map((item => {
        let title = item?.title
        if(title === undefined) title = item?.name

        let newType = item?.media_type;
        if(item?.media_type === undefined && type === 'tv') newType = 'tv';
        if(item?.media_type === undefined && type === 'movie') newType = 'movie';

        return <MovieItem key={item?.id} posterImg={item?.poster_path} title={title} score={item?.vote_average} id={item?.id} type={newType}/>
    }));

    const handlePage = (pageNum) => {
      setPage(() => {
          const newPage = page + pageNum;
          if (newPage === content.total_pages + 1) return 1;
          if(newPage < 1) return 1;
          return newPage;
      })
    };

    const handleChangeType = (newType) => {
        setType(newType);
        setPage(1);
    };

  return (
    <div className='search-page'>
        <header>
            <h6>Results for: <span className='query'>{query}</span></h6>
            <ul>
                <li className={type === 'multi' ? 'active' : ''} onClick={() => handleChangeType('multi')}>All results</li>
                <li className={type === 'movie' ? 'active' : ''} onClick={() => handleChangeType('movie')}>Movies</li>
                <li className={type === 'tv' ? 'active' : ''} onClick={() => handleChangeType('tv')}>Tv Shows</li>
            </ul>
        </header>
        <main className='search-page-content'>
            <section className='search-content'>
                {displayContent}
            </section>
        </main>
        <div className='pagination'>
            <button onClick={() => handlePage(-1)}>Prev</button>
            <h6>Page {page}</h6>
            <button onClick={() =>  handlePage(1)}>Next</button>
        </div>
    </div>
  )
}

export default Results
