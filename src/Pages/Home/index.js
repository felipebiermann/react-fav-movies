import { Link } from "react-router-dom";
import { Cards } from "../../components/Cards";
import axios from "axios";
import { useEffect, useState } from "react";

export function Home() {
  const [movComunnity, setMovComunnity] = useState([]);
  console.log(movComunnity);

  useEffect(() => {
    async function fetchMovies() {
      const response = await axios.get(
        "https://ironrest.herokuapp.com/fav-movies"
      );
      setMovComunnity([...response.data]);
    }
    fetchMovies();
  }, []);

  return (
    <>
      <h1 style={{ margin: "15px" }}>Meus filmes favoritos</h1>
      <Link to="/fav-movies">
        <button style={{ cursor: "pointer", marginLeft: "80px" }}>
          Criar minha coleção
        </button>
      </Link>

      <h2 style={{ marginRight: "30px", marginTop: "50px" }}>
        Filmes da Comunidade:
      </h2>

      {movComunnity.map((currentMovie) => {
        return <Cards owner={currentMovie.owner} id={currentMovie._id} />;
      })}
    </>
  );
}
