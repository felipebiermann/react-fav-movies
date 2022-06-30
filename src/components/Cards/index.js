import { Link } from "react-router-dom";

export function Cards(props) {
  return (
    <div className="card" style={{ width: "18rem" }}>
      <img
        className="card-img-top"
        style={{ width: "100%" }}
        src="https://artex.com.br/emcasa/wp-content/uploads/2021/03/cinema1.png"
        alt="sessão cinema"
      />
      <div className="card-body">
        <h5
          className="card-title"
          style={{ fontSize: "20px", marginLeft: "50px", margin: "10px" }}
        >{`Coleção ${props.owner}`}</h5>

        <Link to={`/movie/${props.id}`} className="btn btn-primary">
          Ver a Coleção Completa!
        </Link>
      </div>
    </div>
  );
}
