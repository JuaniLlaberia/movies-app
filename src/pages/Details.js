import { useParams } from 'react-router-dom'
import apiConfig from '../apiConfig';
import '../assets/detailsPage.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import MovieItem from '../components/MovieItem';
import useFetchData from '../hooks/useFetchData';

const Details = () => {
    let { id, type } = useParams();
    const {data: info, error: errorInfo, loading: loadingInfo} = useFetchData(`${apiConfig.baseUrl}${type}/${id}?language=en-US&api_key=${apiConfig.apiKey}`);
    const {data: recommendations, error: errorRecommendations, loading: loadingRecommendations} = useFetchData(`${apiConfig.baseUrl}${type}/${id}/recommendations?language=en-US&page=1&api_key=${apiConfig.apiKey}`);

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

  return (
  <>
    <section className='details-page'>
      <div className='filter'></div>
      <img src={apiConfig.bgImgUrl(info.backdrop_path)} className='details-page-bg'/>
      <div className='details-page-info-section'>
        <div className='left-info'>
            <h1 className='details-page-title'>{title}</h1>
            <ul className='details-page-genres'>
                {info.genres?.map(genre => <li>{genre.name}</li>)}
            </ul>
            <p className='details-page-summary'>{info.overview}</p>
            <div style={{display:'flex', justifyContent:'space-around', alignItems:'center', gap:'1vw'}}>
                <h6 className='details-page-date'>Released date: {released}</h6>
                <h6 className='details-page-duration'>{type === 'tv' ? `Duration: ${duration} seasons`: `Duration: ${duration} min.`}</h6>
            </div>
        </div>
            <div className='img-container'>
                <h6 className='details-page-score'><FontAwesomeIcon icon={faStar} className='star-icon'/> {(info.vote_average * 10).toFixed(1)}</h6>
                <img src={apiConfig.posterImgUrl(info.poster_path)} className='details-page-poster'/>
            </div>
      </div>
      {errorInfo ? <div>{errorInfo.message}</div> : null}
    </section>
    <section className='recommendations'>
        <h6 className='rec-title'>Recommendations</h6>
        <ul className='trending-items-scroll'>
            {loadingRecommendations ? <div className='loader'></div> : recommendationsToRender}
            {errorRecommendations ? <div>{errorRecommendations.message}</div> : null}
        </ul>
    </section>
  </>
  )
}

export default Details
