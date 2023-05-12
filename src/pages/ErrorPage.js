import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"


const ErrorPage = () => {
  return (
    <main style={{height:'100vh', display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column', backgroundColor:'#22253f'}}>
        <FontAwesomeIcon icon={faTriangleExclamation} size="3x" style={{color:'red'}}/>
        <h1 style={{fontSize:'1.5rem', color:'white'}}>404 Error: Page Not Found.</h1>
        <Link to='/' style={{marginTop:'15px', color:'white', textDecoration:'underline', fontSize:'1rem'}}>Go Home</Link>
    </main>
  )
}

export default ErrorPage
