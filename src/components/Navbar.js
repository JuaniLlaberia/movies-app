import { Link } from 'react-router-dom'
import '../assets/navbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilm, faHouse, faTv, faHeart, faX, faBarsStaggered } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);

  const handleClick = () => setIsMobile(false);

  return (
    <nav className='navbar' >
        <ul className={isMobile ? 'active' : ''} onClick={handleClick}>
            <Link to='/' className='nav-item'><FontAwesomeIcon icon={faHouse} /> Home</Link>
            <Link to='/catalog/movie' className='nav-item'><FontAwesomeIcon icon={faFilm}/> Movies</Link>
            <Link to='/catalog/tv' className='nav-item'><FontAwesomeIcon icon={faTv}/> Series</Link>
            <Link to='/favorites' className='nav-item'><FontAwesomeIcon icon={faHeart}/> My List</Link>
        </ul>
        <button onClick={() => setIsMobile(!isMobile)} className='responsive-ham-button'>{!isMobile ? <FontAwesomeIcon size='2x' icon={faBarsStaggered}/> : <FontAwesomeIcon size='2x' icon={faX}/>}</button>
    </nav>
  )
}

export default Navbar
