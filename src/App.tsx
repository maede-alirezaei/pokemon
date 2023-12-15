import React, { useEffect, useState } from "react";
import {
  PokemonData,
  get_pokemon_image_url,
  get_pokemon_names,
} from "./helpers";

import "./App.css";

interface PokemonCardProps {
  pokemon: PokemonData;
  toggleFavorite: (id: string) => void;
}

function PokemonCard({ pokemon, toggleFavorite }: PokemonCardProps) {
  const [pokeImg, setPokeImg] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await get_pokemon_image_url(pokemon.name);
        setPokeImg(result);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    fetchData();
  }, [pokemon]);

  if (!pokemon || !pokeImg) return null;

  return (
    <div className="card">
      <button onClick={() => toggleFavorite(pokemon.id)}>
        {pokemon.isFavorite ? "Unmark as Favorite" : "Mark as Favorite"}
      </button>
      <div className="name">{pokemon.name}</div>
      <img className="image" src={pokeImg} alt="Pokemon_Image" />
    </div>
  );
}

const PokemonGrid = ({ initData }: { initData: PokemonData[] }) => {
  const [pokemons, setPokemones] = useState<PokemonData[]>(initData);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const toggleFavorite = (id: string) => {
    setPokemones((prevFavorites) =>
      prevFavorites.map((item) =>
        item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
      )
    );
  };
  useEffect(() => {
    if (showFavoritesOnly) {
      setPokemones((prevFavorites) =>
        prevFavorites.filter((item) => item.isFavorite === true)
      );
    } else {
      setPokemones(initData);
    }
  }, [showFavoritesOnly, initData]);
  const favoriteHandler = () => {
    setShowFavoritesOnly(!showFavoritesOnly);
  };

  return (
    <div className="grid-container">
      <label>
        <input
          type="checkbox"
          className="checkbox"
          onChange={favoriteHandler}
        />
        Favourites only
      </label>
      <br />
      <div className="grid">
        {pokemons.map((pokemon) => (
          <PokemonCard
            pokemon={pokemon}
            key={pokemon.id}
            toggleFavorite={toggleFavorite}
          />
        ))}
      </div>
    </div>
  );
};

const App = () => {
  const [data, setData] = useState<PokemonData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await get_pokemon_names(25);
        setData(result);
      } catch (error) {
        console.error("Error fetching Pokemon names:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div
      className="App"
      style={{ backgroundColor: "#f0f0f0", minHeight: "100vh" }}
    >
      <PokemonGrid initData={data} />
    </div>
  );
};

export default App;
