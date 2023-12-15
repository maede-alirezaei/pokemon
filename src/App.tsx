import { useEffect, useState } from "react";
import { get_pokemon_image_url, get_pokemon_names } from "./helpers";

import "./App.css";

function PokemonCard({ name }: { name: string }) {
  const [pokeImg, setPokeImg] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const result = await get_pokemon_image_url(name);
      setPokeImg(result);
    };
    fetchData();
  }, [name]);
  if (!name) return null;

  if (!pokeImg) return null;

  return (
    <div className="card">
      {/* <button onClick={() => toggleFavorite(item.id)}>
        {item.isFavorite ? "Unmark as Favorite" : "Mark as Favorite"}
      </button> */}
      <div className="name">{name}</div>
      <img className="image" src={pokeImg} alt="Pokemon_Image" />
    </div>
  );
}

function PokemonGrid() {
  const [data, setData] = useState<string[]>();

  useEffect(() => {
    const fetchData = async () => {
      const result = await get_pokemon_names(25);
      localStorage.setItem("pokemonData", result.toString());
      setData(result);
    };
    fetchData();
  }, []);

  return (
    <div className="grid-container">
      <label>
        <input type="checkbox" className="checkbox" />
        Favourites only
      </label>
      <br />
      <div className="grid">
        {data &&
          data.map((pokemonName, index) => (
            <PokemonCard name={pokemonName} key={index} />
          ))}
      </div>
    </div>
  );
}

function App() {
  return (
    <div
      className="App"
      style={{ backgroundColor: "#f0f0f0", minHeight: "100vh" }}
    >
      <PokemonGrid />
    </div>
  );
}

export default App;
