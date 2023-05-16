import { Link } from 'react-router-dom'
import apiConfig from '../apiConfig'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faStar } from '@fortawesome/free-solid-svg-icons'
import { useFavContext } from '../context/FavoriteContext'

const MovieItem = ({posterImg, title, score, id, type}) => {
  const { favItems, removeFavMovie, addFavMovie } = useFavContext();

  const isItemFav = favItems?.some(item => item.data.movieId == id);

  return (
    <li className='movie-item-container'>
      <Link to={`/${type}/${id}`}>
          <div className='movie-item'>
              <img className='movie-item-img' src={apiConfig.posterImgUrl(posterImg)} alt={title} draggable={false}/>
              <div className='img-overlay'>
                {title ? <h6 className='movie-item-title'>{title}</h6> : null}
              </div>
              <div className='movie-item-score'><FontAwesomeIcon icon={faStar} className='star-icon'/> <span className='movie-item-score-number'>{score === 0 ? 'NEW' : (score * 10).toFixed(1)}</span></div>
          </div>
      </Link>
      {isItemFav ? <button onClick={() => removeFavMovie(id)} className='fav-icon-item active'><FontAwesomeIcon size='2x' icon={faHeart}/></button> : <button onClick={() => addFavMovie(title, id, type, posterImg, score)} className='fav-icon-item'><FontAwesomeIcon size='2x' icon={faHeart}/></button>}
    </li>
  )
}

export default MovieItem
