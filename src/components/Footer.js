import { faGithub, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
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
            <li><a href='https://www.linkedin.com/in/juan-ignacio-llaberia-241b351b3/'><FontAwesomeIcon size='3x' icon={faLinkedin}/></a></li>
            <li><a href='https://github.com/JuaniLlaberia'><FontAwesomeIcon size='3x' icon={faGithub}/></a></li>
            <li><a href='https://www.instagram.com/juani_llabe/'><FontAwesomeIcon size='3x' icon={faInstagram}/></a></li>
          </ul>
        </div>
      </section>
    </footer>
  )
}

export default Footer
