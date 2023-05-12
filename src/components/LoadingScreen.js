import { ScaleLoader } from 'react-spinners';

const LoadingScreen = () => {
  return (
    <main style={{position:'fixed', zIndex:'100', height:'100vh', width:'100vw', backgroundColor:'rgb(36, 34, 34)', display:'flex', justifyContent:'center', alignItems:'center'}}>
        <ScaleLoader color="#a64cff" />
    </main>
  )
}

export default LoadingScreen
