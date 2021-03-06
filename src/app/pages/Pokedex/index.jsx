import { htmlToVdom } from 'hyperstatic/src/htmlToVdom'
import description from './description.md'
import { targetValue } from '../../../utils'

import { SetPokeSearch, ClearSearch, Init as PokedexInit } from './actions'
import { Link } from 'hyperstatic'

export default state => {
  const results = state.pokemons
    ? state.pokemons.filter(pokemon => pokemon.name.toLowerCase().includes(state.pokeSearch.toLowerCase()))
    : []

  return (
    <div class="pokedex">
      {htmlToVdom(description)}
      <label for="searchField">Search pokemons</label>
      <div class="search">
        <input
          id="searchField"
          name="searchField"
          value={state.pokeSearch}
          oninput={[SetPokeSearch, targetValue]}
          placeholder="Type here..."
        />
        {state.pokeSearch && <a class="clear" onclick={ClearSearch}>Clear</a>}
      </div>
      <p>Total: {results.length}</p>
      <div class="grid">
        {results.map(pokemon => (
          <Link to={`/pokedex/${pokemon.id}`} class="card">
            <img src={pokemon.img} alt={pokemon.name} />
          </Link>
        ))}
      </div>
    </div>
  )
}

export const Init = PokedexInit
