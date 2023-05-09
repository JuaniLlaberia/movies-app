import { useEffect } from "react";

function App() {
  useEffect(()=> {
    const fetchMovies = async () => {
      const response = await fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&api_key=ea962e6c660af4bd263293356299c277');
      const data = await response.json();
      console.log(data);
    }
    fetchMovies();
  }, []);
  
  return (
    <div className="App">
      Hello world!
    </div>
  );
}

export default App;
