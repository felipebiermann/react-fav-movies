import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";

export function EditPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    owner: "",
    description: "",
    movies: [],
  });

  const { id } = useParams();

  const [mov, setMov] = useState([]);

  const [selectMov, setSelectMov] = useState([]);
  console.log(selectMov);

  useEffect(() => {
    async function fetchEditMovie() {
      try {
        const response = await axios.get(
          `https://ironrest.herokuapp.com/fav-movies/${id}`
        );

        setForm(...response.data);

        setMov({ ...response.data.movies });
      } catch (err) {
        console.log(err);
      }
    }
    fetchEditMovie();
  }, [id]);

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

    setForm({ ...form, movies: [...form.movies, selectMov] });
    toast.success("Seu filme foi adicionado à sua coleção.");
  }
  console.log(form);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const clone = { ...form };
      delete clone._id;
      await axios.put(`https://ironrest.herokuapp.com/fav-movies/${id}`, clone);

      navigate("/");
    } catch (err) {
      console.log(err);
    }
  }
  console.log(handleSubmit);

  return (
    <>
      <div className="container">
        <Toaster />
        <form onSubmit={handleSubmit}>
          <label
            style={{
              width: "100px",
              height: "50px",
              margin: "0 auto",
              textAlign: "center",
            }}
            htmlFor="owner-input"
          >
            Edite sua coleção:
          </label>
          <input
            id="owner-input"
            value={form.owner}
            type="string"
            name="owner"
            onChange={handleChange}
          />
          <label
            style={{
              width: "100px",
              height: "100px",
              textAlign: "center",
              marginTop: "01px",
            }}
            htmlFor="description-input"
          >
            Descrição:
          </label>
          <input
            id="description-input"
            value={form.description}
            type="string"
            name="description"
            onChange={handleChange}
          />
          <h2>Edite a sua coleção:</h2>
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <label
                style={{
                  width: "100px",
                  height: "10px",
                  margin: "0 auto",
                  textAlign: "center",
                }}
              >
                Filmes:
              </label>
            </div>
            <select
              className="custom-select"
              id="inputGroupSelect01"
              value={selectMov}
              onChange={(e) => setSelectMov(e.target.value)}
            >
              {mov.map((currentElement) => {
                return (
                  <option value={currentElement.original_title}>
                    {currentElement.original_title}
                  </option>
                );
              })}
            </select>
          </div>
          <button
            className="btn btn-success d-flex flex-column"
            type="button"
            onClick={handleClick}
            style={{ margin: "10px" }}
          >
            Adicionar Filme
          </button>

          <button
            className="btn btn-warning d-flex flex-column"
            onClick={handleSubmit}
            type="submit"
            style={{ margin: "10px" }}
          >
            Editar
          </button>
        </form>
      </div>
    </>
  );
}
