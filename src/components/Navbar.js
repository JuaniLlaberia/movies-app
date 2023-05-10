import { Link } from 'react-router-dom'
import '../assets/navbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilm, faHouse, faTv, faBookmark } from '@fortawesome/free-solid-svg-icons'

const Navbar = () => {
  return (
    <nav className='navbar'>
        <ul>
            <Link to='/' className='nav-item'><FontAwesomeIcon icon={faHouse}/> Home</Link>
            <Link to='/catalog/movie' className='nav-item'><FontAwesomeIcon icon={faFilm}/> Movies</Link>
            <Link to='/catalog/tv' className='nav-item'><FontAwesomeIcon icon={faTv}/> Series</Link>
            <Link className='nav-item'><FontAwesomeIcon icon={faBookmark}/> Saved</Link>
        </ul>
        <button>Theme</button>
    </nav>
  )
}

export default Navbar
