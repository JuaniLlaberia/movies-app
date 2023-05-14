import { useEffect, useState } from 'react'
import useFetchData from '../hooks/useFetchData';
import apiConfig from '../apiConfig';
import ProviderCard from './ProviderCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceSadTear } from '@fortawesome/free-regular-svg-icons';

const Providers = ({type, id}) => {
    const [countryCode, setCountryCode] = useState('US');
    const {data: info} = useFetchData(`${apiConfig.baseUrl}${type}/${id}/watch/providers?language=en-US&api_key=${apiConfig.apiKey}`);

    //Get location of divice
    const getCurrentLocation = () => {
        return new Promise(function (resolve, reject) {
            navigator.geolocation.getCurrentPosition(resolve, reject);
          });
    };

    useEffect(() => {
        const getCountryCode = async () => {
            //Get location
            const data = await getCurrentLocation();
            const { latitude: lat, longitude:lng } = data.coords;

            //Get country code
            const resLocation = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`)
            const dataLocation = await resLocation.json();
            setCountryCode(dataLocation.countryCode);
        }
        getCountryCode();
    }, []);


    //Checking that is not undefined and then mapping the providers
    let providers = null;
    if (info && info.results && info.results[countryCode]) {
        providers = info.results[countryCode].flatrate?.map(item => {
            return <ProviderCard url={item.logo_path} />
        });
    }

  return (
    <div className='providers-container'>
        <h6 className='providers-title'>Where to watch it?</h6>
        <ul className='providers-list'>
            {providers !== null ? providers : <div style={{color:'white'}}>Not available <FontAwesomeIcon icon={faFaceSadTear}/></div>}
        </ul>
    </div>
  )
}

export default Providers
