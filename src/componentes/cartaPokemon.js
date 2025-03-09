import React, { useEffect, useState } from "react";
import { Card, Modal } from "react-bootstrap";

function PokemonCard({ name, url }) {
  const [pokemonData, setPokemonData] = useState(null);
  const [show, setShow] = useState(false); // Estado para controlar el modal

  useEffect(() => {
    fetch(url) // Obtener los detalles del Pokemon
      .then((response) => response.json())
      .then((data) => setPokemonData(data))
      .catch((error) => console.error("Error al cargar las cartas:", error));
  }, [url]);

  return (
    <>
      {/* carta pokemon */}
      <Card
        className="text-center shadow-lg p-3 mb-4 rounded"
        onClick={() => setShow(true)}
        style={{
          cursor: "pointer",
          backgroundColor: "rgba(196, 86, 223, 0.55)", // fondo claro
          border: "3px solid #ffcc00", // borde amarillo
        }}
        //eventos para cambiar de tamaño al pasar el raon
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        {pokemonData && (
          <>
            <Card.Img
              variant="top"
              src={pokemonData.sprites.front_default}
              alt={name}
              className="p-3"
            />
            <Card.Body>
              <Card.Title className="text-capitalize" style={{ color: "white" }}>{name}</Card.Title>
            </Card.Body>
          </>
        )}
      </Card>
      {/* modal con detalles del pokemon */}
      {pokemonData && (
        <Modal show={show} onHide={() => setShow(false)} centered>
          <Modal.Header closeButton style={{ backgroundColor: "rgb(155, 112, 168)", color: "white" }}>
            <Modal.Title className="text-capitalize" >{name}</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ backgroundColor: "rgb(209, 187, 215)" }}>
            <div className="d-flex align-items-center">
              {/* imagen a la izquierda */}
              <img
                src={pokemonData.sprites.front_default}
                alt={name}
                className="img-fluid"
                style={{ width: "200px", height: "200px", marginRight: "20px" }} // espacio a la derecha
              />
              {/* informacion a la derecha */}
              <div>
                <p><strong>Altura:</strong> {pokemonData.height / 10} m</p>
                <p><strong>Peso:</strong> {pokemonData.weight / 10} kg</p>
                <p><strong>Tipo:</strong> {pokemonData.types.map(t => t.type.name).join(", ")}</p>
                <p><strong>Habilidades:</strong> {pokemonData.abilities.map(t => t.ability.name).join(", ")}</p>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer style={{ backgroundColor: "rgb(155, 112, 168)", padding: "30px" }}></Modal.Footer>
        </Modal>
      )}
    </>
  );
}

export default PokemonCard;
