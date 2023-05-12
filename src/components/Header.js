import { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const Header = ({setQuery}) => {
  const navigate = useNavigate();
  const queryRef = useRef();
  const [loaded, setLoaded] = useState(false)

  useEffect(() => setLoaded(true), [])

  const handleSearch = () => {
    if(queryRef.current.value === '') return;
    setQuery(queryRef.current.value);
    localStorage.setItem('MOVIE_QUERY', JSON.stringify(queryRef.current.value));
    navigate('/search');
  };

  return (
    <header className='home-page-header'>
        <h1 className={`${loaded ? 'loaded' : ''}`}>Search for all your favorite movies and shows</h1>
        <div className={`search-bar ${loaded ? 'loaded' : ''}`}>
          <input ref={queryRef} type='text' placeholder='Search movies, series... e.g. Star Wars'/>
          <FontAwesomeIcon icon={faMagnifyingGlass} className='magnifying-glass-icon'/>
          <button onClick={handleSearch}>Search</button>
        </div>
    </header>
  )
}

export default Header
