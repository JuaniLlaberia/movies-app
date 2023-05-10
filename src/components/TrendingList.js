import { useEffect, useState } from "react"
import apiConfig from "../apiConfig";
import MovieItem from "./MovieItem";
import { Link } from "react-router-dom";

const TrendingList = ({title, urlSection}) => {
    const [trending, setTrending] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${apiConfig.baseUrl}${urlSection}&api_key=${apiConfig.apiKey}`);
                const data = await response.json();
                setTrending(data.results)
            } catch(err) {
                console.log(err);
            }
        }
        fetchData();
    }, [urlSection]);

    const listToRender = trending?.map(item => {
        let title = item?.title
        if(title === undefined) title = item?.name
        return <MovieItem key={item?.id} posterImg={item?.poster_path} title={title} score={item?.vote_average} id={item?.id} type={item?.media_type}/>
    })

  return (
    <section className='trending-list'>
        <div className='trending-top'>
            <h6 className='trending-title'>{title}</h6>
            <Link to=''>See more</Link>
        </div>
        <ul className='trending-items-scroll'>
            {listToRender}
        </ul>
    </section>
  )
}

export default TrendingList
