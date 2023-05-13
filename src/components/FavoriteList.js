import { Link } from 'react-router-dom'
import { useState } from 'react';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const FavoriteList = ({list, title, linkTo}) => {
  const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

  return (
    <section>
          <div className='favorite-top'>
            <div style={{display:'flex', position:'relative'}} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              <h6 className={`trending-title ${isHovered ? 'op' : ''}`} style={{marginLeft:'15px'}}>{title}</h6>
              <Link to={`/${linkTo}`} className={`trending-title fav behind ${isHovered ? 'active' : ''}`}>See more<FontAwesomeIcon icon={faChevronRight}/></Link>
            </div>
          <Link to={`/${linkTo}`} className='see-more-hidden' style={{marginRight:'7.5px'}}>See more<FontAwesomeIcon icon={faChevronRight}/></Link>
          </div>
          <ul className='favorite-list-home'>
            {list}
          </ul>
    </section>
  )
}

export default FavoriteList
