import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export function MoviePages() {
  const { id } = useParams();
  const [moviePage, setMoviePage] = useState({});
  const navigate = useNavigate();
  console.log(moviePage);

  useEffect(() => {
    async function fetchMoviePage() {
      try {
        const response = await axios.get(
          `https://ironrest.herokuapp.com/fav-movies/${id}`
        );

        setMoviePage(response.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchMoviePage();
  }, []);
  async function handleDelete() {
    try {
      await axios.delete(`https://ironrest.herokuapp.com/fav-movies/${id}`);

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <h1>Coleção {moviePage.owner}</h1>
      <ul>
        <li>Nome do filme: {moviePage.movies}</li>
        <li>Descrição: {moviePage.description}</li>
      </ul>
      <Link to={`/edit-page/${id}`} className="btn btn-primary">
        Editar Filmes
      </Link>
      <button className="btn btn-danger" onClick={handleDelete}>
        Deletar Filme
      </button>
    </>
  );
}
