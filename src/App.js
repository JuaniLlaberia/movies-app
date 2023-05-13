import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Details from "./pages/Details";
import Trending from "./pages/Trending";
import Footer from './components/Footer'
import Navbar from "./components/Navbar";
import Results from "./pages/Results";
import Favorites from './pages/Favorites'
import { useState } from "react";
import Catalog from "./pages/Catalog";
import ScrollToTopReload from "./components/ScrollToTopReload";
import ErrorPage from "./pages/ErrorPage";

function App() {
  const [globalQuery, setGlobalQuery] = useState(() => {
    const storedQuery = JSON.parse(localStorage.getItem('MOVIE_QUERY'));
    if (storedQuery == null) return '';
    return storedQuery;
  });

  return (
    <div className="App">
      <Navbar setQuery={setGlobalQuery}/>
      <ScrollToTopReload/>
      <Routes>
        <Route path='/' element={<Home setQuery={setGlobalQuery}/>}/>
        <Route path='/search' element={<Results query={globalQuery}/>}/>
        <Route path="/:type/:id" element={<Details />}/>
        <Route path='/catalog/:typeOf' element={<Catalog />}/>
        <Route path='/favorites' element={<Favorites />}/>
        <Route path='/*' element={<ErrorPage/>}/>
        <Route path='/trending' element={<Trending />}/>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
