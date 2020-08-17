import { Init as PokedexInit } from './actions'
import { Link } from 'hyperstatic'

export default state => {
  const pokemon = state.pokemons
    ? state.pokemons.find(poke => poke.id === parseInt(state.location.params.id))
    : null
  return pokemon
    ? (
      <div class="pokemon">
        <Link to="/pokedex">Back to list</Link>
        <div class="row">
          <img src={pokemon.img} alt={pokemon.name} />
          <div class="info">
            <h3>{pokemon.name}</h3>
          </div>
        </div>
      </div>
    )
    : 'Pokemons are loading!'
}

export const Init = (state) => {
  if (!state.pokemons) {
    return PokedexInit(state)
  }
  return state
}
