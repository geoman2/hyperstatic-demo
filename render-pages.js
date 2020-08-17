const fetch = require('node-fetch')

const renderPages = require('hyperstatic/src/renderPages');

(async () => {
  let pages = [
    '/',
    '/project',
    '/starter',
    '/counter',
    '/pokedex',
    '/apod'
  ]

  // Get a list of pokemon pages
  const pokemonPages = await fetch('https://github.com/geoman2/hyperstatic-demo/blob/master/pokedex1.json')
    .then(response => response.json())
    .then(data => data.pokemon.map(pokemon => `/pokedex/${pokemon.id}`))

  // Add pokemons pages to urls
  pages = pages.concat(pokemonPages)

  renderPages(pages)
    .then(() => {
      console.log('All pages rendered!')
      process.exit(0)
    })
})()
