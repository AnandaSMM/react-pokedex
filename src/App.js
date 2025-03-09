import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import PokemonCard from "./componentes/cartaPokemon";

function App() {
  const [allPokemons, setAllPokemons] = useState([]); // Lista completa de Pokemon
  const [displayedPokemons, setDisplayedPokemons] = useState([]); // Los Pokemon que se muestran
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0); // Controla cuantos Pokemons se han mostrado
  const limit = 18; // Cuantos Pokemons vamos a cargar

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=152&offset=0") // obtenemos todos los pokemons
      .then((response) => response.json())
      .then((data) => {
        setAllPokemons(data.results); // guardamos la lista completa
        setDisplayedPokemons(data.results.slice(0, limit)); // mostramos solo los primeros 18
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al cargar los Pokemon:", error);
        setLoading(false);
      });
  }, []);

  // Función para cargar mas Pokemons
  const loadMorePokemons = () => {
    const newOffset = offset + limit;
    setDisplayedPokemons(allPokemons.slice(0, newOffset + limit)); // agregamos mas pokemons a la vista
    setOffset(newOffset);
  };

  return (
    <Container className="mt-4" >
      <h1 className="text-center mb-5" style={{ color: "white", fontSize: "40px" }}>Pokédex</h1>
      <Row className="justify-content-center">
        {displayedPokemons.map((pokemon, index) => (
          <Col xs={6} sm={6} md={4} lg={2} key={index}>
            <PokemonCard name={pokemon.name} url={pokemon.url} style={{ backgroundColor: "rgb(171, 4, 138)" }} />
          </Col>
        ))
        }
      </Row>
      {/* boton para cargar mas pokemon */}
      <div className="text-center mt-3">
        {displayedPokemons.length < allPokemons.length && (
          <Button variant="primary" onClick={loadMorePokemons}>
            Más pokémon
          </Button>
        )}
      </div>
    </Container>
  );
}

export default App;
