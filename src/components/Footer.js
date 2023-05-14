import { faGithub, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faMoon, faSun } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

const Footer = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <footer>
      <section className='footer-top'>
        <div className='footer-top-left'>
          <Link to='/'>Home</Link>
          <Link to='/trending'>Trending</Link>
          <Link to='/catalog/movie'>Popular</Link>
        </div>
        <div className='footer-top-right'>
          <Link to='/catalog/movie'>Movies</Link>
          <Link to='/catalog/tv'>Series</Link>
          <Link to='/favorites'>My List</Link>
        </div>
      </section>
      <section className='footer-bottom'>
        <div className='footer-bottom-left'>
            <p><a href='https://developer.themoviedb.org/docs'>TMDB Api</a> was used for this proyect</p>
            <p>Project designed and coded by Juan I. Llaberia</p>
        </div>
        <div className='footer-bottom-right'>
          <ul>
            <button onClick={toggleTheme} style={{color:'white', background:'transparent', border:'none', cursor:'pointer'}}><FontAwesomeIcon icon={theme === 'dark' ? faMoon : faSun} size='3x'/></button>
            <li><a href='https://www.linkedin.com/in/juan-ignacio-llaberia-241b351b3/' target='_blank'><FontAwesomeIcon size='3x' icon={faLinkedin}/></a></li>
            <li><a href='https://github.com/JuaniLlaberia' target='_blank'><FontAwesomeIcon size='3x' icon={faGithub}/></a></li>
            <li><a href='https://www.instagram.com/juani_llabe/' target='_blank'><FontAwesomeIcon size='3x' icon={faInstagram}/></a></li>
          </ul>
        </div>
      </section>
    </footer>
  )
}

export default Footer
