import { Link } from 'react-router-dom'
import '../assets/navbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilm, faHouse, faTv, faHeart } from '@fortawesome/free-solid-svg-icons'
import Switch from './Switcher/Switch'

const Navbar = () => {
  return (
    <nav className='navbar' >
        <ul>
            <Link to='/' className='nav-item'><FontAwesomeIcon icon={faHouse}/> Home</Link>
            <Link to='/catalog/movie' className='nav-item'><FontAwesomeIcon icon={faFilm}/> Movies</Link>
            <Link to='/catalog/tv' className='nav-item'><FontAwesomeIcon icon={faTv}/> Series</Link>
            <Link to='/favorites' className='nav-item'><FontAwesomeIcon icon={faHeart}/> My List</Link>
        </ul>
        <Switch/>
    </nav>
  )
}

export default Navbar
