import { Link, useNavigate } from 'react-router-dom'
import '../assets/navbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilm, faHouse, faTv, faHeart, faX, faBarsStaggered, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useRef, useState } from 'react'
import { useAuthContext } from '../context/AuthContext'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'

const Navbar = ({setQuery}) => {
  const {currentUser, loginGoogle, logout} = useAuthContext();
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => setLoaded(true), []);

  const queryRef = useRef();

  const handleClick = () => setIsMobile(false);

  const handleSearch = () => {
    if(queryRef.current.value === '') return;
    setQuery(queryRef.current.value);
    localStorage.setItem('MOVIE_QUERY', JSON.stringify(queryRef.current.value));
    navigate('/search');
    queryRef.current.value = null;
  };

  const handleLoginGoogle = async () => {
    try {
      await loginGoogle();
    } catch(err) {
      console.log(err);
    }
    setOpenModal(false)
  };

  const logoutAcc = async () => {
    try {
      await logout();
      navigate(0)
    } catch(err) {
      console.log(err);
    }
  };

  return (
    <>
    <nav className={`navbar ${loaded ? 'loaded' : ''}`} >
        <ul className={isMobile ? 'active' : ''} onClick={handleClick}>
            <Link to='/' className='nav-item'><FontAwesomeIcon icon={faHouse} /> Home</Link>
            <Link to='/catalog/movie' className='nav-item'><FontAwesomeIcon icon={faFilm}/> Movies</Link>
            <Link to='/catalog/tv' className='nav-item'><FontAwesomeIcon icon={faTv}/> Series</Link>
            <Link to='/favorites' className='nav-item'><FontAwesomeIcon icon={faHeart} className='icon-nav'/> My List</Link>
        </ul>
        <button onClick={() => setIsMobile(!isMobile)} className='responsive-ham-button'>{!isMobile ? <FontAwesomeIcon size='2x' icon={faBarsStaggered}/> : <FontAwesomeIcon size='2x' icon={faX}/>}</button>
        <div className='test'>
          <div className='search-field-nav'>
            <input ref={queryRef} type='text' placeholder='Search Here'/>
            <button onClick={handleSearch}><FontAwesomeIcon icon={faMagnifyingGlass}/></button>
          </div>
          {!currentUser && <button onClick={() => setOpenModal(true)} className='login-btn'>Log In</button>}
          {currentUser && <img src={currentUser?.photoURL} onClick={logoutAcc} draggable={false} className='profile-img'/>}
        </div>
    </nav>
    {openModal && <div className='login-modal'>
        <button onClick={() => setOpenModal(false)} className='x-close'><FontAwesomeIcon icon={faX}/></button>
        <h6>Login</h6>
        <button className='btn-google' onClick={handleLoginGoogle}><FontAwesomeIcon icon={faGoogle}/> Google</button>
      </div>}
    {openModal && <div onClick={() => setOpenModal(false)} className='login-overlay'></div>}
    </>
  )
}

export default Navbar
