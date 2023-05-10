import { Link } from 'react-router-dom'
import apiConfig from '../apiConfig'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

const MovieItem = ({posterImg, title, score, id, type}) => {
  return (
    <Link to={`/${type}/${id}`}>
        <li className='movie-item'>
            <img className='movie-item-img' src={apiConfig.posterImgUrl(posterImg)} alt={title}/>
            <div className='img-overlay'>
              {title ? <h6 className='movie-item-title'>{title}</h6> : null}
            </div>
            <div className='movie-item-score'><FontAwesomeIcon icon={faStar} className='star-icon'/> <span className='movie-item-score-number'>{(score * 10).toFixed(1)}</span></div>
        </li>
    </Link>
  )
}

export default MovieItem
