
import { Http } from '../../../utils'
import { HandleError } from '../../actions'

// Nested setter helper
const Setter = (state, fragment) => ({
  ...state,
  books: {
    ...state.books,
    ...fragment
  }
})

export const Init = (state) => Setter(state, {
  search: '',
  isFetching: false,
  total: 0,
  books: {}
})

export const ClearSearch = (state) => Setter(state, {
  search: ''
})

export const SearchBooks = (state, search) => {
  if (search) {
    return [
      Setter(state, {
        search,
        isFetching: true
      }),
      Http.get({
        url: 'https://www.googleapis.com/books/v1/volumes?q=' + search,
        action: HandleResults,
        error: HandleError
      })
    ]
  }
  return state
}

const HandleResults = (state, response) => Setter(state, {
  isFetching: false,
  results: response.items.map(book => book.id),
  books: response.items.reduce((books, book) => ({ ...books, [book.id]: book }), state.books.books),
  total: response.totalItems
})

export const LoadBookIfNeeded = (state, location) => {
  if (state.books && state.books.books[location.params.id]) {
    return state
  }
  return [
    state,
    Http.get({
      url: 'https://www.googleapis.com/books/v1/volumes/' + location.params.id,
      action: HandleBook
    })
  ]
}

const HandleBook = (state, response) => Setter(state, {
  books: {
    ...(state.books ? state.books.books : {}),
    [response.id]: response
  }
})
