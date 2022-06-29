import { Link } from "react-router-dom";

export function Home() {
  return (
    <>
      <h1 style={{ margin: "15px" }}>Meus filmes favoritos</h1>
      <Link to="/fav-movies">Criar minha coleção</Link>
    </>
  );
}
