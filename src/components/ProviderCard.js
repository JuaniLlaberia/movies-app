import apiConfig from '../apiConfig'

const ProviderCard = ({url}) => {
  return (
    <li className='provider-card'>
        <img src={apiConfig.posterImgUrl(url)} className='provider-img'/>
    </li>
  )
}

export default ProviderCard
