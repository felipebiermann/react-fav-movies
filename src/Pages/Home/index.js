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
      <div className="container" style={{ textAlign: "center" }}>
        <h1
          style={{
            margin: "15px",
            fontFamily: "Blippo, fantasy",
            backgroundColor: "black",
            color: "white",
          }}
        >
          Meus Filmes Favoritos
        </h1>
        <Link to="/fav-movies">
          <button
            className="btn btn-success"
            style={{ cursor: "pointer", marginLeft: "80px", margin: "0 auto" }}
          >
            Criar minha coleção
          </button>
        </Link>

        <h2 style={{ marginRight: "02px", marginTop: "60px" }}>
          Filmes da Galera:
        </h2>

        {movComunnity.map((currentMovie) => {
          return (
            <Cards
              style={{ margin: "0 auto" }}
              owner={currentMovie.owner}
              id={currentMovie._id}
            />
          );
        })}
      </div>
    </>
  );
}
