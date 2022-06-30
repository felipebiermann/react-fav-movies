import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";

export function FavMovies() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    owner: "",
    description: "",
    movies: [],
  });

  const [mov, setMov] = useState([]);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/discover/movie?api_key=8d2e31af66893eb36eaa5222cc031742"
        );
        setMov(response.data.results);
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    }
    fetchMovies();
  }, []);

  function handleChange(e) {
    e.preventDefault();

    setForm({ ...form, [e.target.name]: e.target.value });
    console.log(form);
  }

  function handleClick(e) {
    console.log(handleClick);
    e.preventDefault();

    setForm({ ...form, movies: mov });
    toast.success("Seu filme foi adicionado à sua coleção.");
    // console.log(e);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await axios.post("https://ironrest.herokuapp.com/fav-movies", form);

      navigate("/");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <Toaster />
      <form onSubmit={handleSubmit}>
        <label htmlFor="owner-input">Seu nome:</label>
        <input
          id="owner-input"
          value={form.owner}
          type="string"
          name="owner"
          onChange={handleChange}
        />
        <label htmlFor="description-input">Descrição:</label>
        <input
          id="description-input"
          value={form.description}
          type="string"
          name="description"
          onChange={handleChange}
        />
        <h2>Escolha os Filmes que você quer assistir:</h2>
        <label>Filmes:</label>
        <select name="select">
          {mov.map((currentElement) => {
            return (
              <option
                onChange={() => {
                  console.log(currentElement);
                }}
                value={currentElement.id}
              >
                {currentElement.original_title}
              </option>
            );
          })}
        </select>
        <button type="button" onClick={handleClick}>
          Adicionar Filme
        </button>

        <button onClick={handleSubmit} type="submit">
          Enviar Coleção
        </button>
      </form>
    </>
  );
}
