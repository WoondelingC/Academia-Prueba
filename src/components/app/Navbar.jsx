import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { startLogout } from "../../actions/auth";


export const Navbar = () => {
  const dispatch = useDispatch();
  const { name } = useSelector((state) => state.auth);

  return (
    <div>
      <div className="collapse" id="navbarToggleExternalContent">
        <div className="bg-dark p-4">
        <Link to="/" className="text-decoration-none">
            <h1 className="text-white">Pokemones</h1>
        </Link>

          <Link to="/agregar" className="text-decoration-none">
            <h3 className="text-white">Añadir Pokemon</h3>
          </Link>
          <h5 className="text-primary">{name}</h5>
          <h3 className="text-danger" onClick={() => dispatch(startLogout())}>
            Logout
          </h3>
        </div>
      </div>
      <nav className="navbar navbar-dark color">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarToggleExternalContent"
            aria-controls="navbarToggleExternalContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
      </nav>
    </div>
  );
};
