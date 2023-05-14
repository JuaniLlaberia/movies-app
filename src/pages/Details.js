import { useParams } from 'react-router-dom'
import apiConfig from '../apiConfig';
import '../assets/detailsPage.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faPlay, faStar } from '@fortawesome/free-solid-svg-icons';
import MovieItem from '../components/MovieItem';
import useFetchData from '../hooks/useFetchData';
import { useFavContext } from '../context/FavoriteContext';
import { useEffect, useState } from 'react';
import CastCard from '../components/CastCard';
import Providers from '../components/Providers';

const Details = ({countryCode}) => {
    let { id, type } = useParams();
    const {data: info, error: errorInfo} = useFetchData(`${apiConfig.baseUrl}${type}/${id}?language=en-US&api_key=${apiConfig.apiKey}`);
    const {data: recommendations, error: errorRecommendations, loading: loadingRecommendations} = useFetchData(`${apiConfig.baseUrl}${type}/${id}/recommendations?language=en-US&page=1&api_key=${apiConfig.apiKey}`);
    const {data: trailer} = useFetchData(`${apiConfig.baseUrl}${type}/${id}/videos?language=en-US&api_key=${apiConfig.apiKey}`);
    const {data: cast, error: errorCast, loading: loadingCast} = useFetchData(`${apiConfig.baseUrl}${type}/${id}/credits?language=en-US&api_key=${apiConfig.apiKey}`);
    const { favItems, dispatch } = useFavContext();
    const [loaded, setLoaded] = useState(false);
    const [modalTrailer, setModalTrailer] = useState(false);

    const isItemFav = favItems?.some(item => item.id == id);

    useEffect(() => setLoaded(true), []);

    //Movies and Tv shows have some different naming properties

    let title = info.title;
    if(title === undefined) title = info.name;

    let released = info.release_date;
    if(released === undefined) released = info.first_air_date;

    let duration = info.runtime;
    if(duration === undefined) duration = info.seasons?.length;

    const recommendationsToRender = recommendations?.results?.map(rec => {
        let title = rec?.title
        if(title === undefined) title = rec?.name
        return <MovieItem key={rec?.id} posterImg={rec?.poster_path} title={title} score={rec?.vote_average} id={rec?.id} type={rec?.media_type}/>
    })

    const castCards = cast?.cast?.slice(0, 15).map(person => {
        return <CastCard key={person.id} character={person.character} name={person.name} img={person.profile_path}/>
    })

    const trailerKey = trailer?.results?.filter(a => a.type === 'Trailer')[0]?.key;

  return (
  <>
    <section className='details-page'>
      <div className='filter'></div>
      <img src={apiConfig.bgImgUrl(info.backdrop_path)} className='details-page-bg' alt={`${title} background`} draggable={false}/>
      <div className='details-page-info-section'>
        <div className={`left-info ${loaded ? 'loaded' : ''}`}>
            <h1 className='details-page-title'>{title}</h1>
            <ul className='details-page-genres'>
                {info.genres?.map(genre => <li>{genre.name}</li>)}
            </ul>
            <p className='details-page-summary'>{info.overview}</p>
            <div style={{display:'flex', justifyContent:'space-around', alignItems:'center', gap:'1vw'}}>
                <h6 className='details-page-date'>Released date: {released}</h6>
                <h6 className='details-page-duration'>{type === 'tv' ? `Duration: ${duration} seasons`: `Duration: ${duration} min.`}</h6>
            </div>
            <div className='options-buttons'>
                <a onClick={() => setModalTrailer(true)}><FontAwesomeIcon icon={faPlay}/> Play Now</a>
                {isItemFav ? <button onClick={() => dispatch({type:'removeItem', info: {id:id}})} className='fav-icon-details active'><FontAwesomeIcon size='3x' icon={faHeart}/></button> : <button onClick={() => dispatch({type:'addItem', info:{name:title, id:id, type:type, posterImg:info.poster_path, score:info.vote_average}})} className='fav-icon-details'><FontAwesomeIcon size='3x' icon={faHeart}/></button>}
            </div>
        </div>
            <div className='img-container'>
                <h6 className='details-page-score'><FontAwesomeIcon icon={faStar} className='star-icon'/> {(info.vote_average * 10).toFixed(1)}</h6>
                <img src={apiConfig.posterImgUrl(info.poster_path)} className='details-page-poster' alt={`${title} poster`} draggable={false}/>
            </div>
      </div>
      {errorInfo ? <div>{errorInfo.message}</div> : null}
    </section>
    <Providers type={type} id={id} code={countryCode}/>
    <section className='recommendations'>
        <h6 className='rec-title'>Cast</h6>
        <ul className='details-items-scroll'>
            {loadingCast ? <div className='loader'></div> : castCards}
            {errorCast ? <div>{errorCast.message}</div> : null}
        </ul>
    </section>
    <section className='recommendations'>
        <h6 className='rec-title'>Recommendations</h6>
        <ul className='details-items-scroll'>
            {loadingRecommendations ? <div className='loader'></div> : recommendationsToRender}
            {errorRecommendations ? <div>{errorRecommendations.message}</div> : null}
        </ul>
    </section>
    {modalTrailer ? <div className='modal-trailer'>
        <iframe src={`https://www.youtube.com/embed/${trailerKey}`} title={`${title} Trailer`} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen" allowfullscreen/>
    </div>: null}
    {modalTrailer ? <div className='overlay' onClick={() => setModalTrailer(false)}></div> : null}
  </>
  )
}

export default Details
