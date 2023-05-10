import apiConfig from "../apiConfig";
import MovieItem from "./MovieItem";
import { Link } from "react-router-dom";
import useFetchData from "../hooks/useFetchData";
import { ClipLoader } from 'react-spinners';

const TrendingList = ({title, urlSection}) => {
    const { data, error, loading} = useFetchData(`${apiConfig.baseUrl}${urlSection}&api_key=${apiConfig.apiKey}`);

    const listToRender = data?.results?.map(item => {
        let title = item?.title
        if(title === undefined) title = item?.name
        return <MovieItem key={item?.id} posterImg={item?.poster_path} title={title} score={item?.vote_average} id={item?.id} type={item?.media_type}/>
    })

  return (
    <section className='trending-list'>
        <div className='trending-top'>
            <h6 className='trending-title'>{title}</h6>
            <Link to='' className='see-more-link'>See more</Link>
        </div>
        <ul className='trending-items-scroll'>
            {loading ? <ClipLoader color="#D4ADFC" /> : listToRender}
            {error === null ? null : <div>{error.message}</div>}
        </ul>
    </section>
  )
}

export default TrendingList
