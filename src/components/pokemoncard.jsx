import PropTypes from 'prop-types';

function PokemonCard({ pokemon }) {
  return (
    <div className="pokemon-card">
      <h2>{pokemon.name} (#{pokemon.id})</h2>
      <img src={pokemon.image} alt={pokemon.name} />
      <p>Tipo(s): {pokemon.types}</p>
    </div>
  );
}

PokemonCard.propTypes = {
  pokemon: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    id: PropTypes.number,
    types: PropTypes.string,
  }).isRequired,
};

export default PokemonCard;