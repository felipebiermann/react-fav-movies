import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

export function MoviePages() {
  const { id } = useParams();
  const [moviePage, setMoviePage] = useState({});
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

  return (
    <>
      <h1>Coleção {moviePage.owner}</h1>
      <ul>
        <li>Nome do filme: {moviePage.original_title}</li>
        <li>Descrição: {moviePage.description}</li>
      </ul>
    </>
  );
}
