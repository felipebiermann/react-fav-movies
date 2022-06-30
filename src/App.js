import { Routes, Route } from "react-router-dom";
import { Home } from "./Pages/Home";
import { FavMovies } from "./Pages/FavMovies";
import { MoviePages } from "./Pages/MoviesPages";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/fav-movies" element={<FavMovies />} />
        <Route path="/movie/:id" element={<MoviePages />} />
      </Routes>
    </>
  );
}

export default App;
