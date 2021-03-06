import { NoPrerender } from 'hyperstatic'
import { htmlToVdom } from 'hyperstatic/src/htmlToVdom'
import description from './description.md'
import { Http, preloadImage } from '../../../utils'
import { HandleError } from '../../actions'

export default (state) => (
  <div>
    {htmlToVdom(description)}
    <NoPrerender>
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
    </NoPrerender>
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
