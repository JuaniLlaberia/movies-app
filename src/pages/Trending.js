import '../assets/searchPage.css'
import apiConfig from '../apiConfig'
import MovieItem from '../components/MovieItem';
import useFetchData from '../hooks/useFetchData';
import { ClipLoader } from 'react-spinners';
import { useTheme } from '../context/ThemeContext'
import { useState } from 'react';

const Catalog = () => {
    const [page, setPage] = useState(1);
    const { theme } = useTheme();
    const {data, error, loading} = useFetchData(`${apiConfig.baseUrl}trending/all/day?language=en-US&page=${page}&api_key=${apiConfig.apiKey}`);

    const displayContent = data?.results?.map((item => {
        let title = item?.title
        if(title === undefined) title = item?.name
        return <MovieItem key={item?.id} posterImg={item?.poster_path} title={title} score={item?.vote_average} id={item?.id} type={item?.media_type}/>
    }));

    const handlePage = (pageNum) => {
      setPage(() => {
          const newPage = page + pageNum;
          if (newPage === data.total_pages + 1) return 1;
          if(newPage < 1) return 1;
          return newPage;
      })
    };

  return (
    <div className={`search-page ${theme}`}>
        <header>
        <h6>Trending</h6>
        </header>
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
