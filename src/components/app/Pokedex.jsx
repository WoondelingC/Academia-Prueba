import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { toFirstCharUppercase } from "./constants";
import axios from "axios";
import { Link } from "react-router-dom";
import '../../styles/main.css'
import { useDispatch, useSelector } from "react-redux";
import { startLogout } from "../../actions/auth";

const useStyles = makeStyles((theme) => ({
  pokedexContainer: {
    paddingTop: "20px",
    paddingLeft: "50px",
    paddingRight: "50px",
    background: "linear-gradient(180deg, red, white, blue)",
  },
  cardMedia: {
    margin: "auto",
  },
  cardContent: {
    textAlign: "center",
  },
}));

const Pokedex = (props) => {
  const dispatch = useDispatch();
  const { name } = useSelector((state) => state.auth);
  const classes = useStyles();
  const [pokemonData, setPokemonData] = useState({});
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=25$`)
      .then(function (response) {
        const { data } = response;
        const { results } = data;
        const newPokemonData = {};
        results.forEach((pokemon, index) => {
          newPokemonData[index + 1] = {
            id: index + 1,
            name: pokemon.name,
            sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
              index + 1
            }.png`,
          };
        });
        setPokemonData(newPokemonData);
      });
  }, []);

  const handleSearchChange = (e) => {
    setFilter(e.target.value);
  };

  const getPokemonCard = (pokemonId) => {
    const { id, name, sprite } = pokemonData[pokemonId];
    return (
      <Grid item xs={4} key={pokemonId}>
        <Link to={`/${id}`} className="text-decoration-none">
          <Card>
            <CardMedia
              className={classes.cardMedia}
              image={sprite}
              style={{ width: "130px", height: "130px" }}
            />
            <CardContent className={classes.cardContent}>
              <Typography>{`${id}. ${toFirstCharUppercase(name)}`}</Typography>
            </CardContent>
          </Card>
        </Link>
      </Grid>
    );
  };

  return (
    <>
      <div className={classes.searchContainer}>
        <div className="collapse" id="navbarToggleExternalContent">
          <div className="bg-dark p-4">
            <Link to="/agregar" className="text-decoration-none"><h3 className="text-white h4">Añadir Pokemon</h3></Link>
            <h5 className="text-primary">{name}</h5>
            <h3 className="text-danger" onClick={() => dispatch(startLogout())}>Logout</h3>
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
            <form className="d-flex justify-content-center w-100">
          <input
            busqueda={handleSearchChange}
            className="form-control me-2 w-50"
            type="search"
            placeholder="Search"
            aria-label="Search"
            onChange={handleSearchChange}
          />
          <button className="btn btn-outline-warning" type="submit">
            Search
          </button>
        </form>
          </div>
        </nav>
        
      </div>

      {pokemonData ? (
        <Grid container spacing={2} className={classes.pokedexContainer}>
          {Object.keys(pokemonData).map(
            (pokemonId) =>
              pokemonData[pokemonId].name.includes(filter) &&
              getPokemonCard(pokemonId)
          )}
        </Grid>
      ) : (
        <CircularProgress />
      )}
    </>
  );
};

export default Pokedex;
