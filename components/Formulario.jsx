import { useState, useEffect } from "react";
import style from "./Formulario.module.css"


function Formulario() {
  const [search, setSearch] = useState(""); // Es el estado para el input
  const [pokemon, setPokemon] = useState(null); // Estado para guardar el Pokémon
  const [loading, setLoading] = useState(false); //Para el estado de carga
  const [error, setError] = useState(null); // Estado de error

  useEffect(() => {
    if (search === "") return; // Si el input está vacío, no buscar

    const fetchPokemon = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`);
        if (!response.ok) throw new Error("Pokémon no encontrado 😞");

        const data = await response.json();
        setPokemon({
          name: data.name,
          image: data.sprites.front_default,
          type: data.types.map((t) => t.type.name).join(", "),
        });
      } catch (err) {
        setError(err.message);
        setPokemon(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [search]); // Se ejecuta cada vez que se cambia `search`

  return (
    <div className={style.container}>
      <h1>Buscador de Pokémon 🔍</h1>
      
      <input
        type="text"
        placeholder="Escribe un Pokémon..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading && <p>Cargando...</p>}
      {error && <p className="error">{error}</p>}
      
      {pokemon && (
        <div className={style.pokemon}>
          <h2>{pokemon.name.toUpperCase()}</h2>
          <img src={pokemon.image} alt={pokemon.name} />
          <p>Tipo: {pokemon.type}</p>
        </div>
      )}
    </div>
  );
}

export default Formulario;
