import { useState, useEffect } from 'react';
import SearchBar from './components/searchbar';
import PokemonCard from './components/pokemoncard';
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPokemon = async () => {
      if (searchTerm.trim() === '') {
        setPokemon(null);
        setError('');
        return;
      }

      setLoading(true);
      setError('');
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`);
        if (!response.ok) {
          throw new Error('Pokémon no encontrado');
        }
        const data = await response.json();
        setPokemon({
          name: data.name,
          image: data.sprites.front_default,
          id: data.id,
          types: data.types.map(t => t.type.name).join(', ')
        });
      } catch (err) {
        setPokemon(null);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const delayDebounce = setTimeout(() => {
      fetchPokemon();
    }, 500); 

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  return (
    <div className="app">
      <h1>Buscador de Pokémon</h1>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {loading && <p>Cargando...</p>}
      {!loading && error && <p className="error">{error}</p>}
      {!loading && pokemon && <PokemonCard pokemon={pokemon} />}
    </div>
  );
}

export default App;