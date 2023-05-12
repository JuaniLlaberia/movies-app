import React from 'react'
import apiConfig from '../apiConfig'

const CastCard = ({name, img, character}) => {
  return (
    <div className='cast-card'>
      <img src={apiConfig.posterImgUrl(img)}/>
      <h6>{name}</h6>
      <p>As {character}</p>
    </div>
  )
}

export default CastCard
