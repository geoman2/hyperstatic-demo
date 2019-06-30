import htmlToVdom from 'hyperapp-site-generator/src/htmlToVdom'
import description from './description.md'
import { Http, preloadImage } from '../../../utils'
import { HandleError } from '../../actions'

export default (state) => (
  <div>
    {htmlToVdom(`<div>${description}</div>`)}
    {state.apod
      ? (
        <div class="viewer">
          <h1>{state.apod.title}</h1>
          <img src={state.apod.url} alt={state.apod.title} />
          <p>{state.apod.explanation}</p>
        </div>
      )
      : <p>Waiting for <code>api.nasa.gov</code>...</p>
    }
  </div>
)

const HandlePicture = (state, data) => {
  preloadImage(data.url)
  return {
    ...state,
    apod: data
  }
}

export const Init = (state) => [
  state,
  Http.get({
    url: 'https://api.nasa.gov/planetary/apod?api_key=8dUEsh65unCXLDx00RqiRtURx5DNLPSRCtbsJ8v2',
    action: HandlePicture,
    error: HandleError
  })
]
