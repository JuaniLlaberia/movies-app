import React from 'react'
import { Link } from 'react-router-dom'

const FavoriteList = ({list, title, linkTo}) => {
  return (
    <section>
          <div className='favorite-top'>
            <h6 className='trending-title' style={{marginLeft:'15px'}}>{title}</h6>
            <Link to={`/${linkTo}`} className='see-more-link'>See more</Link>
          </div>
          <ul className='favorite-list-home'>
            {list}
          </ul>
    </section>
  )
}

export default FavoriteList
