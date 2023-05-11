import { Link } from 'react-router-dom'
import apiConfig from '../apiConfig'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faStar } from '@fortawesome/free-solid-svg-icons'
import { useFavContext } from '../context/FavoriteContext'

const MovieItem = ({posterImg, title, score, id, type}) => {
  const { favItems, dispatch } = useFavContext();

  const isItemFav = favItems?.some(item => item.id == id);

  return (
    <li className='movie-item-container'>
      <Link to={`/${type}/${id}`}>
          <div className='movie-item'>
              <img className='movie-item-img' src={apiConfig.posterImgUrl(posterImg)} alt={title}/>
              <div className='img-overlay'>
                {title ? <h6 className='movie-item-title'>{title}</h6> : null}
              </div>
              <div className='movie-item-score'><FontAwesomeIcon icon={faStar} className='star-icon'/> <span className='movie-item-score-number'>{(score * 10).toFixed(1)}</span></div>
          </div>
      </Link>
      {/* <button onClick={() => dispatch({type:'addItem', info:{name:title, id:id, type:type, posterImg:posterImg, score:score}})}><FontAwesomeIcon size='2x' icon={faHeart}/></button> */}
      {isItemFav ? <button onClick={() => dispatch({type:'removeItem', info: {id:id}})} className='fav-icon-item active'><FontAwesomeIcon size='2x' icon={faHeart}/></button> : <button onClick={() => dispatch({type:'addItem', info:{name:title, id:id, type:type, posterImg:posterImg, score:score}})} className='fav-icon-item'><FontAwesomeIcon size='2x' icon={faHeart}/></button>}
    </li>
  )
}

export default MovieItem
