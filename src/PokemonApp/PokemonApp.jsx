import React, { useEffect, useState } from "react";

const PokemonApp = () => {
  const [pokemons, setPokemons] = useState([]);
  const [offset, setOffset] = useState(0);
  const limit = 10;
  const BaseUrl = "https://pokeapi.co/api/v2/pokemon";

  const fetchPokemons = async () => {
    const res = await fetch(`${BaseUrl}?offset=${offset}&limit=${limit}`);
    const data = await res.json();

    const detailedData = await Promise.all(
      data.results.map(async (pokemon) => {
        const res = await fetch(pokemon.url);
        return res.json();
      })
    );

    setPokemons(detailedData);
  };

  useEffect(() => {
    fetchPokemons();
  }, [offset]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Pokémon List</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {pokemons.map((pokemon) => (
          <div key={pokemon.id} style={{ border: "1px solid #ddd", padding: "10px", width: "150px", textAlign: "center" }}>
            <h4 style={{ textTransform: "capitalize" }}>{pokemon.name}</h4>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          </div>
        ))}
      </div>

      <div style={{ marginTop: "20px" }}>
        <button onClick={() => setOffset(Math.max(offset - limit, 0))} disabled={offset === 0}>
          Previous
        </button>
        <button onClick={() => setOffset(offset + limit)} style={{ marginLeft: "10px" }}>
          Next
        </button>
      </div>
    </div>
  );
};

export default PokemonApp;