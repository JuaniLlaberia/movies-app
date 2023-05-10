import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Details from "./pages/Details";
import Footer from './components/Footer'
import Navbar from "./components/Navbar";
import Results from "./pages/Results";
import { useState } from "react";

function App() {
  const [globalQuery, setGlobalQuery] = useState(() => {
    const storedQuery = JSON.parse(localStorage.getItem('MOVIE_QUERY'));
    if (storedQuery == null) return '';
    return storedQuery;
  });

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={<Home setQuery={setGlobalQuery}/>}/>
        <Route path='/search' element={<Results query={globalQuery}/>}/>
        <Route path="/:type/:id" element={<Details />}/>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
