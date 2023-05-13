import apiConfig from "../apiConfig";
import MovieItem from "./MovieItem";
import { Link } from "react-router-dom";
import useFetchData from "../hooks/useFetchData";
import { ClipLoader } from 'react-spinners';
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";


const TrendingList = ({title, urlSection}) => {
    const { data, error, loading} = useFetchData(`${apiConfig.baseUrl}${urlSection}&api_key=${apiConfig.apiKey}`);
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const listToRender = data?.results?.map(item => {
        let title = item?.title
        if(title === undefined) title = item?.name
        return <MovieItem key={item?.id} posterImg={item?.poster_path} title={title} score={item?.vote_average} id={item?.id} type={item?.media_type}/>
    })

  return (
    <section className='trending-list'>
        <div className='trending-top'>
            <div style={{display:'flex', position:'relative'}} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <h6  className={`trending-title ${isHovered ? 'op' : ''}`}>{title}</h6>
                <Link to='/trending' className={`trending-title behind ${isHovered ? 'active' : ''}`}>See more<FontAwesomeIcon icon={faChevronRight}/></Link>
            </div>
                <Link to='/trending' className={`see-more-hidden`}>See more<FontAwesomeIcon icon={faChevronRight}/></Link>
        </div>
        <ul className='trending-items-scroll'>
            {loading ? <ClipLoader color="#D4ADFC" /> : listToRender}
            {error === null ? null : <div>{error.message}</div>}
        </ul>
    </section>
  )
}

export default TrendingList
