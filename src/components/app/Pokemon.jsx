import React, { useEffect, useState } from "react";
import { CircularProgress } from "@material-ui/core";
import { toFirstCharUppercase } from "./constants";
import axios from "axios";
import styled from "styled-components";

const Img = styled.img `
  width: 250px;
  height: 230px;
  margin: auto;
`
const Card = styled.div `
  width: 30vw;
  height: 92vh;
  display: grid;
  justify-content: center;
  text-align: center;
  border: 1px solid red;
  background: linear-gradient(20deg, red, white);
  border-radius: 50px;
  padding-bottom: 1vh;
`
const H = styled.h1`
  font-family: 'Indie Flower', cursive;
`
const P = styled.p`
  font-family: 'Indie Flower', cursive;
  margin-bottom: 0;
  font-size: 20px;
`

const Pokemon = (props) => {
  const { match, history } = props;
  const { params } = match;
  const { pokemonId } = params;
  const [pokemon, setPokemon] = useState(undefined);

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
      .then(function (response) {
        const { data } = response;
        setPokemon(data);
      })
      .catch(function (error) {
        setPokemon(false);
      });
  }, [pokemonId]);

  const generatePokemonJSX = (pokemon) => {
    const { name, species, height, weight, types, sprites } = pokemon;
    const { front_default } = sprites;
    

    return (
      <>  
      <div className="d-flex justify-content-center py-4">
        <Card className="card">
          <H>{toFirstCharUppercase(name)}</H>
          <Img src={front_default} alt="pokemon" />
          <H>Pokemon Info</H>
        <P>
          Especie:{`  ${species.name}`}
        </P>
        
        <div className="card-body p-0">
          <P className="card-text">Height: {height}</P>
          <P>Weight: {weight} </P>
          <P> Types:</P>
        {types.map((typeInfo) => {
          const { type } = typeInfo;
          const { name } = type;

          return (<div key={name}> {`${name}`}</div>);
        })}
        <button type="button" className="btn btn-warning btn-lg mt-2 w-75" onClick={() => history.push("/")}>Volver</button>
          </div>
        </Card>
        </div>
      </>
    );
  };

  return (
    <>
      {pokemon === undefined && <CircularProgress />}
      {pokemon !== undefined && pokemon && generatePokemonJSX(pokemon)}
      {pokemon === false && <H> Pokemon not found</H>}
    </>
  );
};

export default Pokemon;
